import { IsString, IsNotEmpty, IsBoolean, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';


export class CreateCapteurDto {
    @ApiProperty({
        description: 'Nom du capteur',
        example: 'Capteur température modifié',
        required: true
    })
    @IsString()
    @IsOptional()
    @IsNotEmpty()
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

export default CreateCapteurDto;