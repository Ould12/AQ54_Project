import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsBoolean, IsOptional } from 'class-validator';

export class UpdateCapteurDto {
    @ApiProperty({
        description: 'Nom du capteur',
        example: 'Capteur température modifié',
        required: false
    })
    @IsString()
    @IsOptional()
    libelle?: string;

    @ApiProperty({
        description: 'Indique si le capteur est supprimé',
        example: false,
        required: false
    })
    @IsBoolean()
    @IsOptional()
    isDeleted?: boolean;
}

export default UpdateCapteurDto;
