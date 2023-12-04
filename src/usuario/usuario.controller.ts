/* eslint-disable prettier/prettier */
import { Body, Controller, Get, Param, Post} from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { UsuarioDto } from './usuario.dto';
import { UsuarioEntity } from './usuario.entity';
import { UsuarioService } from './usuario.service';

@Controller('usuario')
export class UsuarioController {
    constructor(
        private readonly usuarioService: UsuarioService,
    ) { }
    
    @Post()
    async createUsuario(@Body() usuarioDto:UsuarioDto) {
        const usuario : UsuarioEntity = plainToInstance(UsuarioEntity, usuarioDto);
        return await this.usuarioService.createUsuario(usuario);
    }

    @Get(":id")
    async findUsuarioById(@Param("id") id: string) {
        return await this.usuarioService.findUsuarioById(id);
    }

    @Get()
    async findAllUsuarios() {
        return await this.usuarioService.findAllUsuarios();
    }
}
