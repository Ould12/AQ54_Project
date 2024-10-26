import { IsString, IsNotEmpty, IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

// Définition de l'enum pour les périodes possibles
export enum PeriodType {
  DAY = 'day',
  HOUR = 'hour'
}

export class CapteurMetricsKPIDto {
    @ApiProperty({
        description: 'periode (day ou hour uniquement)',
        example: 'hour',
        enum: PeriodType,
        required: true
    })
    @IsEnum(PeriodType, {
        message: 'La période doit être soit "day" soit "hour"'
    })
    @IsNotEmpty()
    period: PeriodType;

    @ApiProperty({
        description: 'date de debut',
        example: '2024-10-17',
        required: true
    })
    @IsString()
    @IsNotEmpty()
    startDate: string;

    @ApiProperty({
        description: 'date de fin',
        example: '2024-10-17',
        required: true
    })
    @IsString()
    @IsNotEmpty()
    endDate: string;
}

export default CapteurMetricsKPIDto;