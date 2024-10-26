import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity('metrics')
export class Metric {
    @PrimaryGeneratedColumn()
    @ApiProperty({
        description: 'Identifiant unique de la metric',
        example: 1
    })
    id: number;

    @Column({ type: 'varchar', length: 255 })
    @ApiProperty({
        description: 'libelle de la metric',
        example: 'PM2. 5'
    })
    libelle: string;

    @Column({ type: 'varchar', length: 255 })
    @ApiProperty({
        description: 'unite de la metric',
        example: 'µg/m³'
    })
    unite: string;

    @Column({ type: 'varchar', length: 255, default: "extT" })
    @ApiProperty({
        description: 'code du capteur',
        example: 'extT'
    })
    code: string;

    @CreateDateColumn({
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP'
    })
    @ApiProperty({
        description: 'Date de création de la metric',
        example: '2024-01-01T00:00:00Z'
    })
    createdAt: Date;

    @Column({
        type: 'boolean',
        default: false
    })
    @ApiProperty({
        description: 'Indique si  la metric est supprimée',
        example: false
    })
    isDeleted: boolean;
}