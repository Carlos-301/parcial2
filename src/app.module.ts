/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FotoModule } from './foto/foto.module';
import { UsuarioModule } from './usuario/usuario.module';
import { RedsocialModule } from './redsocial/redsocial.module';
import { AlbumModule } from './album/album.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RedsocialEntity } from './redsocial/redsocial.entity';
import { FotoEntity } from './foto/foto.entity';
import { UsuarioEntity } from './usuario/usuario.entity';
import { AlbumEntity } from './album/album.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'parcial',
      entities: [RedsocialEntity,FotoEntity, UsuarioEntity, AlbumEntity],
      dropSchema: true,
      synchronize: true,
      keepConnectionAlive: true
    }),FotoModule, UsuarioModule, RedsocialModule, AlbumModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
