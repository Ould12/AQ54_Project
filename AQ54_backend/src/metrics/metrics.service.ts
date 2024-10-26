import { Metric } from "./metric.entity";
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateMetricsDto } from "./dtos/create-metrics.dto";
import UpdateMetricsDto from "./dtos/update-metrics.dto";

@Injectable()
export class MetricService {
    constructor(
        @InjectRepository(Metric)
        private metricRepository: Repository<Metric>,
    ) { }

    create(createMetricsDto: CreateMetricsDto): Promise<Metric> {
        const metric = this.metricRepository.create(createMetricsDto);
        return this.metricRepository.save(metric);
    }

    findAll(): Promise<Metric[]> {
        return this.metricRepository.find({ where: { isDeleted: false } });
    }

    async findOne(id: number): Promise<Metric> {
        const metric = await this.metricRepository.findOne({
            where: { id: id, isDeleted: false }
        });

        if (!metric) {
            throw new NotFoundException('metric not found');
        }

        return metric;
    }

    async update(id: number, updateMetricsDto: UpdateMetricsDto): Promise<Metric> {
        const metric = await this.findOne(id);
        Object.assign(metric, updateMetricsDto);
        return this.metricRepository.save(metric);
    }

    async remove(id: number): Promise<void> {
        const metric = await this.findOne(id);
        await this.metricRepository.remove(metric);
    }
}