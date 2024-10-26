import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Capteur } from './capteur.entity';
import { CapteurService } from './capteur.service';
import CapteurController from './capteur.controller';

@Module({
    imports: [TypeOrmModule.forFeature([Capteur])],
    providers: [CapteurService],
    controllers: [CapteurController],
    exports: [CapteurService],
})
export class CapteurModule { }