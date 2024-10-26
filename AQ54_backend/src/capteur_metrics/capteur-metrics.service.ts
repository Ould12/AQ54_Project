import { Injectable, NotFoundException, Logger, BadRequestException, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { CapteurMetric } from './capteur-metrics.entity';
import { CapteurMetricsDto } from './dtos/capteur-metrics.dto';
import { Capteur } from '../capteur/capteur.entity';
import { Metric } from 'src/metrics/metric.entity';
import { Readable } from 'stream';
import * as csv from 'csv-parser';
import axios from 'axios';
import * as csvParser from 'csv-parser';
import { ConfigService } from '@nestjs/config';
import { format, subHours, isBefore, subDays } from 'date-fns';
import { Cron, CronExpression } from '@nestjs/schedule';
import CapteurMetricsKPIDto, { PeriodType } from './dtos/capteur-metrics-kpi.dto';
import moment from 'moment';


@Injectable()
export class CapteurMetricsService {
    private readonly logger = new Logger(CapteurMetricsService.name);
    constructor(
        @InjectRepository(CapteurMetric)
        private capteurMetricsRepository: Repository<CapteurMetric>,
        @InjectRepository(Capteur)
        private capteurRepository: Repository<Capteur>,
        @InjectRepository(Metric)
        private metricRepository: Repository<Metric>,
        private readonly dataSource: DataSource,
        private configService: ConfigService
    ) {
        this.logger.log('CapteurMetricsService initialized - Cron jobs should be registered');
    }

    async create(createCapteurMetricsDto: CapteurMetricsDto): Promise<CapteurMetric> {
        // Recherche du capteur par son libelle
        const capteur = await this.capteurRepository.findOne({
            where: { 
                libelle: createCapteurMetricsDto.libelleCapteur,
                isDeleted: false 
            }
        });
        
        if (!capteur) {
            throw new NotFoundException(`Capteur with libelle ${createCapteurMetricsDto.libelleCapteur} not found`);
        }

        // Recherche de la metric par son libelle
        const metric = await this.metricRepository.findOne({
            where: { 
                code: createCapteurMetricsDto.codeMetric,
                isDeleted: false 
            }
        });

        if (!metric) {
            throw new NotFoundException(`Metric with code ${createCapteurMetricsDto.codeMetric} not found`);
        }

        // Création de l'entité CapteurMetrics
        const capteurMetrics = this.capteurMetricsRepository.create({
            capteur: capteur,
            metric: metric,
            moyenne: createCapteurMetricsDto.moyenne,
            time: createCapteurMetricsDto.time,
            isDeleted: createCapteurMetricsDto.isDeleted || false
        });

        return this.capteurMetricsRepository.save(capteurMetrics);
    }

    findAll(): Promise<CapteurMetric[]> {
        return this.capteurMetricsRepository.find({
            where: { isDeleted: false },
            relations: ['capteur', 'metric']
        });
    }

    async findOne(id: number): Promise<CapteurMetric> {
        if (!id || isNaN(id)) {
          throw new BadRequestException('ID invalide');
        }
    
        const capteurMetric = await this.capteurMetricsRepository
        .findOne({
            where: { isDeleted: false },
            relations: ['capteur', 'metric']
        });
    
        if (!capteurMetric) {
          throw new BadRequestException(`Capteur metric avec l'ID ${id} non trouvé`);
        }
    
        return capteurMetric;
    }

    async update(id: number, updateCapteurMetricsDto: CapteurMetricsDto): Promise<CapteurMetric> {
        const capteurMetrics = await this.findOne(id);

        if (updateCapteurMetricsDto.libelleCapteur) {
            const capteur = await this.capteurRepository.findOne({
                where: { 
                    libelle: updateCapteurMetricsDto.libelleCapteur,
                    isDeleted: false 
                }
            });
            
            if (!capteur) {
                throw new NotFoundException(`Capteur with libelle ${updateCapteurMetricsDto.libelleCapteur} not found`);
            }
            
            capteurMetrics.capteur = capteur;
        }

        if (updateCapteurMetricsDto.codeMetric) {
            const metric = await this.metricRepository.findOne({
                where: { 
                    code: updateCapteurMetricsDto.codeMetric,
                    isDeleted: false 
                }
            });
            
            if (!metric) {
                throw new NotFoundException(`Metric with code ${updateCapteurMetricsDto.codeMetric} not found`);
            }
            
            capteurMetrics.metric = metric;
        }

        capteurMetrics.moyenne = updateCapteurMetricsDto.moyenne ?? capteurMetrics.moyenne;
        capteurMetrics.time = updateCapteurMetricsDto.time ?? capteurMetrics.time;
        capteurMetrics.isDeleted = updateCapteurMetricsDto.isDeleted ?? capteurMetrics.isDeleted;

        return this.capteurMetricsRepository.save(capteurMetrics);
    }

    async softDelete(id: number): Promise<void> {
        const capteurMetrics = await this.findOne(id);
        capteurMetrics.isDeleted = true;
        await this.capteurMetricsRepository.save(capteurMetrics);
    }

    async hardDelete(id: number): Promise<void> {
        const capteurMetrics = await this.findOne(id);
        await this.capteurMetricsRepository.remove(capteurMetrics);
    }


    async importCapteurMetricsFromCsv(startDate: string, endDate: string): Promise<void> {
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.startTransaction();

        try {
            const capteurs = await this.capteurRepository.find({ where: { isDeleted: false } });
            if (capteurs.length === 0) {
                throw new NotFoundException('No active capteurs found.');
            }

            for (const capteur of capteurs) {
                const apiUrl = this.buildApiUrl(capteur.libelle, startDate, endDate);
                this.logger.log(apiUrl);
                const response = await axios.get(apiUrl, { responseType: 'stream' });

                const metrics = await this.parseCsv(response.data);

                for (const metric of metrics) {
                    this.logger.log('Importation des metrics réussie.');
                    await queryRunner.manager.save(CapteurMetric, metric);
                }
            }

            await queryRunner.commitTransaction();
            this.logger.log('Importation des metrics réussie.');

        } catch (error) {
            await queryRunner.rollbackTransaction();
            this.logger.error('Erreur lors de l\'importation des metrics', error.stack);
        } finally {
            await queryRunner.release();
        }
    } 
  

    private buildApiUrl(capteurLibelle: string, startDate: string, endDate: string): string {
        const apiUrl = 'https://airqino-api.magentalab.it/getHourlyAvg/';
        return `${apiUrl}/${capteurLibelle}/${startDate}/${endDate}`;
    }

    private async parseCsv(stream: Readable): Promise<CapteurMetric[]> {
        const currentDateTime = format(subHours(new Date(), 1), 'yyyy-MM-dd HH:00:00');
    
        const metrics: CapteurMetric[] = [];
    
        return new Promise((resolve, reject) => {
            const promises: Promise<void>[] = [];
    
            stream
                .pipe(csvParser({ separator: ';' }))  // Use semi-colon as the separator
                .on('data', (row) => {
                    const promise = (async () => {
                        try {
                            const rowTime = new Date(row['bucket_start_timestamp']);
                            if (rowTime.getTime() === new Date(currentDateTime).getTime()) {
                                const capteur = await this.getCapteurByLibelle(row['station_name']);
                                const metricValue = await this.getMetricByCode(row['sensor_name']);
    
                                const moyenneValue = row['calibrated_value'] !== undefined ? String(row['calibrated_value']) : '0';
                                const capteurMetric = this.createCapteurMetric(capteur, metricValue, row);
                                capteurMetric.moyenne = moyenneValue;
                                metrics.push(capteurMetric);
                                this.logger.log('Importation des metrics réussie.');
                            }
                        } catch (error) {
                            this.logger.error('Error processing CSV row:', error.message);
                            reject(error);
                        }
                    })();
                    
                    promises.push(promise);
                })
                .on('end', () => {
                    Promise.all(promises)
                        .then(() => resolve(metrics))
                        .catch((error) => reject(error));
                })
                .on('error', (error) => reject(error));
        });
    }
    
    
   
    
    private async getCapteurByLibelle(libelle: string): Promise<Capteur> {
        const capteur = await this.capteurRepository.findOne({
            where: { libelle, isDeleted: false }
        });
    
        if (!capteur) {
            throw new Error(`Capteur avec le libellé "${libelle}" non trouvé.`);
        }
    
        return capteur;
    }
    
    private async getMetricByCode(code: string): Promise<Metric> {
        const metric = await this.metricRepository.findOne({
            where: { code, isDeleted: false }
        });
    
        if (!metric) {
            throw new Error(`Metric avec le code "${code}" non trouvée.`);
        }
    
        return metric;
    }
    
    private createCapteurMetric(capteur: Capteur, metric: Metric, row: any): CapteurMetric {
        const capteurMetric = new CapteurMetric();
        capteurMetric.time = row['bucket_start_timestamp'];
        capteurMetric.capteur = capteur;
        capteurMetric.moyenne = row['calibrated_value'];
        capteurMetric.metric = metric;
        capteurMetric.isDeleted = false;
    
        return capteurMetric;
    }


    @Cron(CronExpression.EVERY_HOUR)
    async importCapteurMetricsFromCsvWithCron() {
      this.logger.debug('Running importCapteurMetricsFromCsv via cron job');
  
      const startDate = this.getStartDate();
      const endDate = this.getEndDate();
  
      await this.importCapteurMetricsFromCsv(startDate, endDate);
    }

    getStartDate(): string {
        const oneDayAgo = subDays(new Date(), 1);
        return format(oneDayAgo, 'yyyy-MM-dd');
      }
    
    getEndDate(): string {
        const now = new Date();
        return format(now, 'yyyy-MM-dd');
    }



    async getCapteurMetricsAveragesByPeriod(dto: CapteurMetricsKPIDto) {
        const { startDate, endDate, period } = dto;
    
        // Vérification que la date de début n'est pas après la date de fin
        const start = new Date(startDate);
        const end = new Date(endDate);

        if (start > end) {
            throw new BadRequestException('La date de début ne peut pas être après la date de fin.');
        }
    
        // Format de date pour le groupement selon la période
        const dateFormat = period === PeriodType.DAY 
            ? 'YYYY-MM-DD' 
            : 'YYYY-MM-DD HH24:00:00'; // Use Postgres format for hours

        // Créer les dates de début et de fin pour la requête
        const startOfDay = new Date(start.setHours(0, 0, 0, 0)); // Début de la journée
        const endOfDay = new Date(end.setHours(23, 59, 59, 999)); // Fin de la journée  
    
        // Requête pour récupérer les données avec moyenne par période
        const query = this.capteurMetricsRepository
        .createQueryBuilder('cm')
        .select([
            period === PeriodType.DAY 
                ? `TO_CHAR(cm.time::timestamp, 'YYYY-MM-DD') as period` 
                : `TO_CHAR(cm.time::timestamp, 'YYYY-MM-DD HH24:00:00') as period`, // Format according to the period
            period === PeriodType.DAY 
                ? 'AVG(CAST(cm.moyenne AS DECIMAL(10,2))) as moyenne' // Calculate average if the period is "day"
                : 'cm.moyenne as moyenne', // Use the existing average value if the period is "hour"
            'capteur.libelle as capteurLibelle',
            'metric.libelle as metricLibelle',
            'metric.unite as unite'
        ])
        .leftJoin('cm.capteur', 'capteur')
        .leftJoin('cm.metric', 'metric')
        .where('cm.time BETWEEN :startDate AND :endDate', {
            startDate: startOfDay,
            endDate: endOfDay,
        })
        .andWhere('cm.isDeleted = false')
        .groupBy(period === PeriodType.DAY 
            ? `TO_CHAR(cm.time::timestamp, 'YYYY-MM-DD')` 
            : `TO_CHAR(cm.time::timestamp, 'YYYY-MM-DD HH24:00:00')`)
        .addGroupBy('capteur.libelle')
        .addGroupBy('metric.libelle')
        .addGroupBy('metric.unite')
        // If the period is "hour", include the "moyenne" in the group by
        if (period === PeriodType.HOUR) {
            query.addGroupBy('cm.moyenne');
        }
        query.orderBy('period', 'ASC');
    
    
        try {
            const results = await query.getRawMany();

            if (results.length === 0) {
                throw new NotFoundException('Aucune donnée trouvée pour la période spécifiée.');
            }

            // Transformation des résultats dans le format souhaité
            const formattedResults = results.reduce((acc, curr) => {
                const { period, moyenne, capteurlibelle, metriclibelle, unite } = curr;            
                if (!acc[period]) {
                    acc[period] = {};
                }
            
                if (!acc[period][capteurlibelle]) {
                    acc[period][capteurlibelle] = {};
                }
            
                acc[period][capteurlibelle][metriclibelle] = {
                    value: parseFloat(moyenne),
                    unite
                };
            
                return acc;
            }, {});
    
            return formattedResults;
        } catch (error) {
            this.logger.log(error);
            // Gérer les erreurs ici
            throw new InternalServerErrorException('Erreur lors de la récupération des moyennes des métriques');

        }
    }
    }    
    