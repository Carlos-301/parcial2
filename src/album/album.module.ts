import { Module } from '@nestjs/common';
import { AlbumService } from './album.service';
import { AlbumController } from './album.controller';
import { AlbumEntity } from './album.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FotoEntity } from 'src/foto/foto.entity';

@Module({
  imports:[TypeOrmModule.forFeature([AlbumEntity, FotoEntity])],
  providers: [AlbumService],
  controllers: [AlbumController]
})
export class AlbumModule {}
