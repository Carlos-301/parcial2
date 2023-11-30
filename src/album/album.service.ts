/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AlbumEntity } from './album.entity';
import { FotoEntity } from 'src/foto/foto.entity';
import { BusinessError, BusinessLogicException } from 'src/shared/interceptors/business-errors/bussiness-error';


@Injectable()
export class AlbumService {

    constructor(
        @InjectRepository(AlbumEntity)
        private readonly albumRepository:Repository<AlbumEntity>
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
            throw new BusinessLogicException("There are photos associated!!!!",BusinessError.PRECONDITION_FAILED);
      }

      async addFotoToAlbum(albumId:string, fotoId:string){
        const album: AlbumEntity = await this.albumRepository.findOne({where:{id:albumId}, relations:["fotos"]})
        const foto: FotoEntity = await this.fotoRepository.findOne({where:{id:fotoId}, relations:["album"]})

        if (foto.fecha > album.fechafin || foto.fecha < album.fechainicio)
            throw new BusinessLogicException("The photo is not in the album range",BusinessError.PRECONDITION_FAILED);
        

}
