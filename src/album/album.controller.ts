/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put } from '@nestjs/common';
import { AlbumService } from './album.service';
import { AlbumDto } from './album.dto';
import { AlbumEntity } from './album.entity';
import { plainToInstance } from 'class-transformer';

@Controller('album')
export class AlbumController {
    constructor(
        private readonly albumService: AlbumService,
    ) { }

    @Post()
    async create(@Body() albumDto: AlbumDto) {
        const album:AlbumEntity = plainToInstance(AlbumEntity, albumDto);
        return await this.albumService.create(album);
    }

    @Get(":id")
    async findAlbumById(@Param("id") id: string) {
        return await this.albumService.findAlbumById(id);
    }

    @Delete(":id")
    @HttpCode(204)
    async deleteAlbum(@Param("id") id: string) {
        return await this.albumService.deleteAlbum(id);
    }

    @Put(":id")
    async updateAlbum(@Param("id") id: string, @Param("fotoid") fotoid:string) {
        return await this.albumService.addFotoToAlbum(id, fotoid);
    }
}
