import { Module } from '@nestjs/common';
import { FotoService } from './foto.service';
import { FotoController } from './foto.controller';
import { FotoEntity } from './foto.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AlbumEntity } from 'src/album/album.entity';

@Module({
  imports:[TypeOrmModule.forFeature([FotoEntity, AlbumEntity])],
  providers: [FotoService],
  controllers: [FotoController]
})
export class FotoModule {}
