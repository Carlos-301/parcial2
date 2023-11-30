/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FotoEntity } from './foto.entity';
import { BusinessError, BusinessLogicException } from 'src/shared/interceptors/business-errors/bussiness-error';
import { AlbumEntity } from 'src/album/album.entity';
import { AlbumService } from 'src/album/album.service';

@Injectable()
export class FotoService {
    
    constructor(
        @InjectRepository(FotoEntity)
        private readonly fotoRepository:Repository<FotoEntity>
      ){}

    async createFoto(foto:FotoEntity){
        if(foto.ISO<100 || foto.ISO>6400)
            throw new BusinessLogicException("El ISO debe estar entre 100 y 6400", BusinessError.PRECONDITION_FAILED);
        if(foto.velObturacion<2 || foto.velObturacion>250)
            throw new BusinessLogicException("La velocidad de obturacion debe estar entre 2 y 250", BusinessError.PRECONDITION_FAILED);
        if(foto.apertura<1 || foto.apertura>32)
            throw new BusinessLogicException("La apertura debe estar entre 1 y 32", BusinessError.PRECONDITION_FAILED);
        if(foto.ISO >6500/2 && foto.velObturacion> 252/2 && foto.apertura>33/2)
            throw new BusinessLogicException("Para poder crear la foto solo pueden haber 2 valores que sean mayores a la media de sus cotas ", BusinessError.PRECONDITION_FAILED);
        
        return await this.fotoRepository.save(foto);
    }

    async findFotoById(id:string){
        const foto: FotoEntity = await this.fotoRepository.findOne({where:{id}})
        if (!foto)
            throw new BusinessLogicException("Not found",BusinessError.NOT_FOUND);
        return foto;
    }   

    async findAllFotos(){
         return await this.fotoRepository.find();
    }

    async deleteFoto(fotoid:string){
        const foto: FotoEntity = await this.fotoRepository.findOne({where:{id:fotoid}, relations:["album"]})
        if(!foto)
            throw new BusinessLogicException("Not found",BusinessError.NOT_FOUND);
    }
}
