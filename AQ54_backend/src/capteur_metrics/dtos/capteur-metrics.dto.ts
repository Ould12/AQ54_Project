import { IsString, IsNotEmpty, IsBoolean, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CapteurMetricsDto {
    @ApiProperty({
        description: 'Libelle du capteur',
        example: 'SMART154',
        required: true
    })
    @IsString()
    @IsNotEmpty()
    libelleCapteur: string;

    @ApiProperty({
        description: 'code de la metric',
        example: 'pm25',
        required: true
    })
    @IsString()
    @IsNotEmpty()
    codeMetric: string;


    @ApiProperty({
        description: 'moyenne de la metric',
        example: '25.493333333333336',
        required: true
    })
    @IsString()
    @IsNotEmpty()
    moyenne: string;


    @ApiProperty({
        description: 'temps de recuperation de la metric',
        example: '2024-10-17 23:00:00',
        required: true
    })
    @IsString()
    @IsNotEmpty()
    time: string;
    

    @ApiProperty({
        description: 'Indique si la ligne est supprimée',
        example: false,
        required: false
    })
    @IsBoolean()
    @IsOptional()
    isDeleted?: boolean;
}

export default CapteurMetricsDto;