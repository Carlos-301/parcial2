/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { UsuarioService } from './usuario.service';
import { FotoEntity } from '../foto/foto.entity';
import { TypeOrmTestingConfig } from '../shared/testing-utils/typeorm-testing-config';
import { UsuarioEntity } from './usuario.entity';
import { RedsocialEntity } from '../redsocial/redsocial.entity';

describe('UsuarioService', () => {
  let service: UsuarioService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports:[...TypeOrmTestingConfig()],
      providers: [UsuarioService],
    }).compile();

    service = module.get<UsuarioService>(UsuarioService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('Deberia crear un usuario', async ()=>{
    const usuario:UsuarioEntity = {
      id:"1",
      nombre:"Peter Parker",
      telefono:"3210515165",
      fotos:[new FotoEntity()],
      redsocial:new RedsocialEntity()
    }
    const newUsuario: UsuarioEntity = await service.createUsuario(usuario);
    expect(newUsuario).not.toBeNull();
  })

  it('Deberia fallar al crear un usuario', async ()=>{
    const usuario:UsuarioEntity = {
      id:"1",
      nombre:"Peter Parker",
      telefono:"13210515165",
      fotos:[new FotoEntity()],
      redsocial:new RedsocialEntity()
    }
    await expect(()=> service.createUsuario(usuario)).rejects.toHaveProperty("message","Numero de telefono equivocado");
  })

  it('Deberia encontrar un usuario', async ()=>{
    const usuario:UsuarioEntity = {
      id:"1",
      nombre:"Peter Parker",
      telefono:"3210515165",
      fotos:[new FotoEntity()],
      redsocial:new RedsocialEntity()
    }
    await service.createUsuario(usuario);
    const foundUser:UsuarioEntity = await service.findUsuarioById(usuario.id);
    expect(foundUser).not.toBeNull();
  })

  it('Deberia fallar encontrar un usuario', async ()=>{
    await expect(()=> service.findUsuarioById("2")).rejects.toHaveProperty("message", "Usuario no encontrado")
  })

  it('Deberia encontrar a todos los usuarios', async ()=>{
    const foundUsers:UsuarioEntity[] = await service.findAllUsuarios();
    expect(foundUsers).not.toBeNull();
  })
});
