import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { ManyToOne } from 'typeorm/decorator/relations/ManyToOne';
import { Capteur } from 'src/capteur/capteur.entity';
import { Metric } from 'src/metrics/metric.entity';

@Entity('capteur_metrics')
export class CapteurMetric {
    @PrimaryGeneratedColumn()
    @ApiProperty({
        description: 'Identifiant unique',
        example: 1
    })
    id: number;

    @ManyToOne(() => Capteur)
    @ApiProperty({
        description: 'Identifiant du capteur',
        example: 1
    })
    capteur: Capteur;
  
    @ManyToOne(() => Metric)
    @ApiProperty({
        description: 'Identifiant de la metric',
        example: 1
    })
    metric: Metric;

    @Column({ type: 'varchar', length: 255 })
    @ApiProperty({
        description: 'Moyenne de la metric'
    })
    moyenne: string;

    @Column({ type: 'varchar', length: 255 })
    @ApiProperty({
        description: 'Temps de recupération de la donnée'
    })
    time: string;

    @CreateDateColumn({
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP'
    })
    @ApiProperty({
        description: 'Date de création',
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