import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity('capteur')
export class Capteur {
    @PrimaryGeneratedColumn()
    @ApiProperty({
        description: 'Identifiant unique du capteur',
        example: 1
    })
    id: number;

    @Column({ type: 'varchar', length: 255 })
    @ApiProperty({
        description: 'Nom du capteur',
        example: 'Capteur température'
    })
    libelle: string;

    @CreateDateColumn({
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP'
    })
    @ApiProperty({
        description: 'Date de création du capteur',
        example: '2024-01-01T00:00:00Z'
    })
    createdAt: Date;

    @Column({
        type: 'boolean',
        default: false
    })
    @ApiProperty({
        description: 'Indique si le capteur est supprimé',
        example: false
    })
    isDeleted: boolean;
}