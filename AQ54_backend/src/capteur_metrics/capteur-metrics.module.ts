import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CapteurMetricsController } from './capteur-metrics.controller';
import { CapteurMetricsService } from './capteur-metrics.service';
import { CapteurMetric } from './capteur-metrics.entity';
import { Capteur } from '../capteur/capteur.entity';
import { Metric } from 'src/metrics/metric.entity';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
    imports: [
        ScheduleModule.forRoot(),
        TypeOrmModule.forFeature([
            CapteurMetric,
            Capteur,
            Metric
        ])
    ],
    controllers: [CapteurMetricsController],
    providers: [CapteurMetricsService],
    exports: [CapteurMetricsService]
})
export class CapteurMetricModule {}