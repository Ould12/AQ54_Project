import { Controller, Get, Post, Body, Param, Delete, Put, Logger, HttpCode, HttpStatus, Query, ValidationPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CapteurMetricsService } from './capteur-metrics.service';
import { CapteurMetric } from './capteur-metrics.entity';
import { CapteurMetricsDto } from './dtos/capteur-metrics.dto';
import CapteurMetricsKPIDto from './dtos/capteur-metrics-kpi.dto';

@ApiTags('capteur-metrics')
@Controller('capteur-metrics')
export class CapteurMetricsController {
    private readonly logger = new Logger(CapteurMetricsController.name);
    constructor(private readonly capteurMetricsService: CapteurMetricsService) {}

    @Post()
    @ApiOperation({ summary: 'Create a new capteur metrics record' })
    @ApiResponse({ 
        status: 201, 
        description: 'The capteur metrics record has been successfully created.',
        type: CapteurMetric 
    })
    @ApiResponse({ 
        status: 404, 
        description: 'Capteur or Metric not found with provided libelle.' 
    })
    create(@Body() createCapteurMetricsDto: CapteurMetricsDto): Promise<CapteurMetric> {
        return this.capteurMetricsService.create(createCapteurMetricsDto);
    }

    @Post('getCapteurMetricsAveragesByPeriod')
    @ApiOperation({ summary: 'Statistiques des métriques par capteur' })
    @ApiResponse({ status: 200, description: 'Statistiques récupérées avec succès' })
    @ApiResponse({ status: 400, description: 'Données invalides' })
    async getMetricsKPI(
      @Body(new ValidationPipe({ transform: true, whitelist: true })) body: CapteurMetricsKPIDto
    ) {
      return this.capteurMetricsService.getCapteurMetricsAveragesByPeriod(body);
    }
    
    @Get()
    @ApiOperation({ summary: 'Get all capteur metrics records' })
    @ApiResponse({ 
        status: 200, 
        description: 'Return all capteur metrics records.', 
        type: [CapteurMetric] 
    })
    findAll(): Promise<CapteurMetric[]> {
        return this.capteurMetricsService.findAll();
    }

    

    @Get('csv/import')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: 'Import capteur metrics from CSV file' })
    @ApiResponse({ 
        status: 200, 
        description: 'Capteur metrics have been successfully imported from the CSV file.' 
    })
    @ApiResponse({ 
        status: 400, 
        description: 'Invalid date format.' 
    })
    @ApiResponse({ 
        status: 500, 
        description: 'Error during the import process.' 
    })
    async importCapteurMetricsFromCsv(
        @Query('startDate') startDate: string, 
        @Query('endDate') endDate: string
    ): Promise<void> {
        try {
            await this.capteurMetricsService.importCapteurMetricsFromCsv(startDate, endDate);
            this.logger.log('Importation des capteurs et metrics depuis CSV réussie.');
        } catch (error) {
            this.logger.error('Erreur lors de l\'importation des capteurs et metrics depuis CSV', error.stack);
            throw error;
        }
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get capteur metrics record by ID' })
    @ApiResponse({ 
        status: 200, 
        description: 'Return the capteur metrics record.', 
        type: CapteurMetric
    })
    @ApiResponse({ 
        status: 404, 
        description: 'Capteur metrics record not found.' 
    })
    findOne(@Param('id') id: number): Promise<CapteurMetric> {
        return this.capteurMetricsService.findOne(id);
    }

    @Put(':id')
    @ApiOperation({ summary: 'Update capteur metrics record' })
    @ApiResponse({ 
        status: 200, 
        description: 'The capteur metrics record has been successfully updated.',
        type: CapteurMetric 
    })
    @ApiResponse({ 
        status: 404, 
        description: 'Capteur metrics record not found or referenced Capteur/Metric not found.' 
    })
    update(
        @Param('id') id: number, 
        @Body() updateCapteurMetricsDto: CapteurMetricsDto
    ): Promise<CapteurMetric> {
        return this.capteurMetricsService.update(id, updateCapteurMetricsDto);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Soft delete capteur metrics record' })
    @ApiResponse({ 
        status: 200, 
        description: 'The capteur metrics record has been successfully soft deleted.' 
    })
    @ApiResponse({ 
        status: 404, 
        description: 'Capteur metrics record not found.' 
    })
    remove(@Param('id') id: number): Promise<void> {
        return this.capteurMetricsService.softDelete(id);
    }

    @Delete(':id/hard')
    @ApiOperation({ summary: 'Hard delete capteur metrics record' })
    @ApiResponse({ 
        status: 200, 
        description: 'The capteur metrics record has been permanently deleted.' 
    })
    @ApiResponse({ 
        status: 404, 
        description: 'Capteur metrics record not found.' 
    })
    hardDelete(@Param('id') id: number): Promise<void> {
        return this.capteurMetricsService.hardDelete(id);
    }
}

export default CapteurMetricsController;