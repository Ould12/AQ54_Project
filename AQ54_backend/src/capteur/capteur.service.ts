import { Capteur } from "./capteur.entity";
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCapteurDto } from "./dtos/create-capteur.dto";
import UpdateCapteurDto from "./dtos/update-capteur.dto";

@Injectable()
export class CapteurService {
    constructor(
        @InjectRepository(Capteur)
        private capteurRepository: Repository<Capteur>,
    ) { }

    create(createCapteurDto: CreateCapteurDto): Promise<Capteur> {
        const capteur = this.capteurRepository.create(createCapteurDto);
        return this.capteurRepository.save(capteur);
    }

    findAll(): Promise<Capteur[]> {
        return this.capteurRepository.find({ where: { isDeleted: false } });
    }

    async findOne(id: number): Promise<Capteur> {
        const capteur = await this.capteurRepository.findOne({
            where: { id: id, isDeleted: false }
        });

        if (!capteur) {
            throw new NotFoundException('Capteur not found');
        }

        return capteur;
    }

    async update(id: number, updateCapteurDto: UpdateCapteurDto): Promise<Capteur> {
        const capteur = await this.findOne(id);
        Object.assign(capteur, updateCapteurDto);
        return this.capteurRepository.save(capteur);
    }

    async remove(id: number): Promise<void> {
        const capteur = await this.findOne(id);
        await this.capteurRepository.remove(capteur);
    }
}
