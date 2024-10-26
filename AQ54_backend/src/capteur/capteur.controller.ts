import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CapteurService } from './capteur.service';
import { Capteur } from './capteur.entity';
import { CreateCapteurDto } from './dtos/create-capteur.dto';
import { UpdateCapteurDto } from './dtos/update-capteur.dto';


@ApiTags('capteurs')
@Controller('capteur')
export class CapteurController {
    constructor(private readonly capteurService: CapteurService) { }
    @Post()
    @ApiOperation({ summary: 'Create capteur' })
    @ApiResponse({ status: 201, description: 'The capteur has been successfully created.', type: Capteur })
    create(@Body() createCapteurDto: CreateCapteurDto): Promise<Capteur> {
        return this.capteurService.create(createCapteurDto);
    }
    @Get()
    @ApiOperation({ summary: 'Get all capteurs' })
    @ApiResponse({ status: 200, description: 'Return all capteurs.', type: [Capteur] })
    findAll(): Promise<Capteur[]> {
        return this.capteurService.findAll();
    }
    @Get(':id')
    @ApiOperation({ summary: 'Get capteur by ID' })
    @ApiResponse({ status: 200, description: 'Return the capteur.', type: Capteur })
    @ApiResponse({ status: 404, description: 'Capteur not found.' })
    findOne(@Param('id') id: number): Promise<Capteur> {
        return this.capteurService.findOne(id);
    }
    @Put(':id')
    @ApiOperation({ summary: 'Update capteur' })
    @ApiResponse({ status: 200, description: 'The capteur has been successfully updated.', type: Capteur })
    @ApiResponse({ status: 404, description: 'Capteur not found.' })
    update(@Param('id') id: number, @Body() updateCapteurDto: UpdateCapteurDto): Promise<Capteur> {
        return this.capteurService.update(id, updateCapteurDto);
    }
    @Delete(':id')
    @ApiOperation({ summary: 'Delete capteur' })
    @ApiResponse({ status: 200, description: 'The capteur has been successfully deleted.' })
    @ApiResponse({ status: 404, description: 'Capteur not found.' })
    remove(@Param('id') id: number): Promise<void> {
        return this.capteurService.remove(id);
    }
}

export default CapteurController;