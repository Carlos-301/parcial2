/* eslint-disable prettier/prettier */
import { Controller } from '@nestjs/common';
import { AlbumService } from './album.service';

@Controller('album')
export class AlbumController {
    constructor(
        private readonly albumService: AlbumService,
    ) { }

    @Post()
    async create(@Body() album: Album) {
        return await this.albumService.create(album);
    }
}
