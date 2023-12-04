/* eslint-disable prettier/prettier */
import { Body, Controller, Post} from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { RedsocialService } from './redsocial.service';
import { RedsocialDto } from './redsocial.dto';
import { RedsocialEntity } from './redsocial.entity';

@Controller('redsocial')
export class RedsocialController {
    constructor(
        private readonly redsocialService: RedsocialService,
    ) { }
    @Post()
    async createLibreria(@Body() redsocialDto:RedsocialDto) {
        const redsocial : RedsocialEntity = plainToInstance(RedsocialEntity, redsocialDto);
        return await this.redsocialService.createLibreria(redsocial);
    }
}
