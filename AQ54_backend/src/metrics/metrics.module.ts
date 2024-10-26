import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Metric } from './metric.entity';
import { MetricService } from './metrics.service';
import MetricController from './metrics.controller';

@Module({
    imports: [TypeOrmModule.forFeature([Metric])],
    providers: [MetricService],
    controllers: [MetricController],
    exports: [MetricService],
})
export class MetricModule {}
