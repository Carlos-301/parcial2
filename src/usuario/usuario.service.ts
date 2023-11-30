/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { UsuarioEntity } from './usuario.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BusinessError, BusinessLogicException } from 'src/shared/interceptors/business-errors/bussiness-error';

@Injectable()
export class UsuarioService {

    constructor(
            @InjectRepository(UsuarioEntity)
            private readonly usuarioRpository:Repository<UsuarioEntity>
          ){}
          

    async createUsuario(usuario:UsuarioEntity){
        if(usuario.telefono.length >10)
            throw new BusinessLogicException("El titulo no puede tener mas de 10 caracteres", BusinessError.PRECONDITION_FAILED);
        return await this.usuarioRpository.save(usuario);
    }

    async findUsuarioById(id:string){
        const usuario: UsuarioEntity = await this.usuarioRpository.findOne({where:{id}})
        if (!usuario)
            throw new BusinessLogicException("Not found",BusinessError.NOT_FOUND);
        return usuario;
    }

    async findAllUsuarios(){
        return await this.usuarioRpository.find();
    }
    
}
