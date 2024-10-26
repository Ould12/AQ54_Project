import { IsString, IsNotEmpty, IsBoolean, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateMetricsDto {
    @ApiProperty({
        description: 'Libelle du type de particule',
        example: 'PM2.5',
        required: true
    })
    @IsString()
    @IsNotEmpty()
    libelle: string;

    @ApiProperty({
        description: 'Unité du type de particule',
        example: 'µg/m³',
        required: true
    })
    @IsString()
    @IsNotEmpty()
    unite: string;

    @ApiProperty({
        description: 'Indique si le type de particule est supprimé',
        example: false,
        required: false
    })
    @IsBoolean()
    @IsOptional()
    isDeleted?: boolean;
}

export default CreateMetricsDto;