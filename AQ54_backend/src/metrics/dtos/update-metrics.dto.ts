import { IsString, IsNotEmpty, IsBoolean, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateMetricsDto {
    @ApiProperty({
        description: 'Libelle de la metric',
        example: 'PM2.5',
        required: true
    })
    @IsString()
    @IsOptional()
    @IsNotEmpty()
    libelle: string;

    @ApiProperty({
        description: 'Unité de la metric',
        example: 'µg/m³',
        required: true
    })
    @IsString()
    @IsOptional()
    @IsNotEmpty()
    unite: string;

        
    @ApiProperty({
        description: 'code du capteur',
        example: 'extT'
    })
    @IsString()
    @IsOptional()
    @IsNotEmpty()
    code: string;

    @ApiProperty({
        description: 'Indique si la metric est supprimée',
        example: false,
        required: false
    })
    @IsBoolean()
    @IsOptional()
    isDeleted?: boolean;
}

export default UpdateMetricsDto;