/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { UsuarioEntity } from './usuario.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BusinessError, BusinessLogicException } from '../shared/interceptors/business-errors/bussiness-error';

@Injectable()
export class UsuarioService {

    constructor(
            @InjectRepository(UsuarioEntity)
            private readonly usuarioRpository:Repository<UsuarioEntity>
          ){}
          

    async createUsuario(usuario:UsuarioEntity){
        if(usuario.telefono.length >10)
            throw new BusinessLogicException("Numero de telefono equivocado", BusinessError.PRECONDITION_FAILED);
        return await this.usuarioRpository.save(usuario);
    }

    async findUsuarioById(id:string): Promise<UsuarioEntity>{
        const usuario: UsuarioEntity = await this.usuarioRpository.findOneBy({id})
        if (!usuario)
            throw new BusinessLogicException("Usuario no encontrado",BusinessError.NOT_FOUND);
        return usuario;
    }

    async findAllUsuarios(){
        return await this.usuarioRpository.find();
    }
    
}
