import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { MetricService } from './metrics.service';
import { Metric } from './metric.entity';
import { CreateMetricsDto } from './dtos/create-metrics.dto';
import { UpdateMetricsDto } from './dtos/update-metrics.dto';

@ApiTags('metrics')
@Controller('metric')
export class MetricController {
    constructor(private readonly metricService: MetricService) {}

    @Post()
    @ApiOperation({ summary: 'Create metric' })
    @ApiResponse({ status: 201, description: 'The metric has been successfully created.', type: Metric })
    create(@Body() createMetricsDto: CreateMetricsDto): Promise<Metric> {
        return this.metricService.create(createMetricsDto);
    }

    @Get()
    @ApiOperation({ summary: 'Get all metrics' })
    @ApiResponse({ status: 200, description: 'Return all metrics.', type: [Metric] })
    findAll(): Promise<Metric[]> {
        return this.metricService.findAll();
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get metric by ID' })
    @ApiResponse({ status: 200, description: 'Return the metric.', type: Metric })
    @ApiResponse({ status: 404, description: 'Metric not found.' })
    findOne(@Param('id') id: number): Promise<Metric> {
        return this.metricService.findOne(id);
    }

    @Put(':id')
    @ApiOperation({ summary: 'Update metric' })
    @ApiResponse({ status: 200, description: 'The metric has been successfully updated.', type: Metric })
    @ApiResponse({ status: 404, description: 'metric not found.' })
    update(@Param('id') id: number, @Body() updateMetricsDto: UpdateMetricsDto): Promise<Metric> {
        return this.metricService.update(id, updateMetricsDto);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Delete metric' })
    @ApiResponse({ status: 200, description: 'The metric has been successfully deleted.' })
    @ApiResponse({ status: 404, description: 'metric not found.' })
    remove(@Param('id') id: number): Promise<void> {
        return this.metricService.remove(id);
    }
}

export default MetricController;
