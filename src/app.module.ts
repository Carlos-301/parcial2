import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FotoModule } from './foto/foto.module';
import { UsuarioModule } from './usuario/usuario.module';
import { RedsocialModule } from './redsocial/redsocial.module';
import { AlbumModule } from './album/album.module';

@Module({
  imports: [FotoModule, UsuarioModule, RedsocialModule, AlbumModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
