/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AlbumEntity } from './album.entity';
import { FotoEntity } from '../foto/foto.entity';
import { BusinessError, BusinessLogicException } from '../shared/interceptors/business-errors/bussiness-error';


@Injectable()
export class AlbumService {

    constructor(
        @InjectRepository(AlbumEntity)
        private readonly albumRepository:Repository<AlbumEntity>,
        @InjectRepository(FotoEntity)
        private readonly fotoRepository:Repository<FotoEntity>
      ){}


      async create(album:AlbumEntity){
        if (album.titulo.length===0)
          throw new BusinessLogicException("El titulo no puede estar vacio", BusinessError.PRECONDITION_FAILED);
        
        return await this.albumRepository.save(album);
      }

      async findAlbumById(id:string){
        const album: AlbumEntity = await this.albumRepository.findOne({where:{id}, relations:["fotos"]})
        if (!album)
            throw new BusinessLogicException("Not found",BusinessError.NOT_FOUND);
        return album;
      }

      async deleteAlbum(id:string){
        const album: AlbumEntity = await this.albumRepository.findOne({where:{id}, relations:["fotos"]})
        if (album.fotos.length!==0)
            throw new BusinessLogicException("El album tiene fotos asociadas",BusinessError.PRECONDITION_FAILED);
        await this.albumRepository.remove(album)
        return true;
      }

      async addFotoToAlbum(albumId:string, fotoId:string){
        const album: AlbumEntity = await this.albumRepository.findOne({where:{id:albumId}, relations:['fotos']})
        if (!album)
          throw new BusinessLogicException("No se encontro el album", BusinessError.NOT_FOUND);
    
        const foto: FotoEntity = await this.fotoRepository.findOne({where:{id:fotoId}, relations:['usuario', 'album']})
        if (!foto)
            throw new BusinessLogicException("No se encontro la foto", BusinessError.NOT_FOUND);
      
        if (foto.fecha<album.fechainicio || foto.fecha > album.fechafin)
          throw new BusinessLogicException("La foto no esta en el rango de fechas dado", BusinessError.PRECONDITION_FAILED);
    
        album.fotos = [...album.fotos, foto];
        return await this.albumRepository.save(album);
    
      }
        

}
