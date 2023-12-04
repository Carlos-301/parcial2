/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, HttpCode, Param, Post} from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { FotoService } from './foto.service'; 
import { FotoDto } from './foto.dto';
import { FotoEntity } from './foto.entity';

@Controller('foto')
export class FotoController {
    constructor(
        private readonly fotoService: FotoService,
    ) { }

    @Post()
    async create(@Body() fotoDto:FotoDto) {
        const foto : FotoEntity = plainToInstance(FotoEntity, fotoDto);
        return await this.fotoService.createFoto(foto);
    }

    @Get()
    async findAllFotos() {
        return await this.fotoService.findAllFotos();
    }

    @Get(":id")
    async findFotoById(@Param("id") id: string) {
        return await this.fotoService.findFotoById(id);
    }

    @Delete(":id")
    @HttpCode(204)
    async deleteFoto(@Param("id") id: string) {
        return await this.fotoService.deleteFoto(id);
    }

}
