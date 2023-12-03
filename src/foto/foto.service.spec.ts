/* eslint-disable prettier/prettier */
import { FotoService } from './foto.service';
import { FotoEntity } from './foto.entity';
import { TestingModule, Test } from '@nestjs/testing';
import { AlbumEntity } from '../album/album.entity';
import { AlbumService } from '../album/album.service';
import { UsuarioEntity } from '../usuario/usuario.entity';
import { TypeOrmTestingConfig } from '../shared/testing-utils/typeorm-testing-config'; 


describe('FotoService', () => {
  let service: FotoService;
  let albumService: AlbumService;
  

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmTestingConfig()], 
      providers: [FotoService, AlbumService],
    }).compile();

    service = module.get<FotoService>(FotoService);
    albumService = module.get<AlbumService>(AlbumService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('Deberia crear una foto',async ()=>{
    const foto:FotoEntity = {
      id:"",
      ISO:200,
      velObturacion:3,
      apertura:3,
      fecha:new Date(),
      usuario:new UsuarioEntity(),
      album:new AlbumEntity(),
    }

    const newFoto: FotoEntity = await service.createFoto(foto);
    expect(newFoto).not.toBeNull();
  })

  it('Deberia fallar al crear una foto',async ()=>{
    const foto:FotoEntity = {
      id:"",
      ISO:6500,
      velObturacion:1,
      apertura:1,
      fecha:new Date(),
      usuario:new UsuarioEntity(),
      album:new AlbumEntity(),
    }

    await expect(()=> service.createFoto(foto)).rejects.toHaveProperty("message","El ISO debe estar entre 100 y 6400");
  })

  it('Deberia eliminar una foto', async()=>{
    const albumTest:AlbumEntity = {
      id:"1",
      fechainicio:new Date("2019-03-03"),
      fechafin: new Date("2023-12-12"),
      titulo:"album",
      fotos:[new FotoEntity()]
    }
    await albumService.create(albumTest);
    const foto:FotoEntity = {
      id:"1",
      ISO:200,
      velObturacion:3,
      apertura:3,
      fecha:new Date("2022-03-03"),
      usuario:new UsuarioEntity(),
      album:albumTest,
    }

    await service.createFoto(foto);
    const deletionStatus = await service.deleteFoto(foto.id);
    expect(deletionStatus).toBeTruthy();
  })

  it('Deberia fallar al eliminar una foto', async()=>{
    await expect(() => service.deleteFoto("2")).rejects.toHaveProperty("message","Not found");
  })

  it('Deberia encontrar una foto', async()=>{
    const fotoTest:FotoEntity = {
      id:"1",
      ISO:200,
      velObturacion:3,
      apertura:3,
      fecha:new Date(),
      usuario:new UsuarioEntity(),
      album:new AlbumEntity(),
    }
    await service.createFoto(fotoTest);
    const foto:FotoEntity = await service.findFotoById("1");
    expect(foto).not.toBeNull();
  })

  it('Deberia fallar al encontrar una foto', async()=>{
    await expect(()=>service.findFotoById("1")).rejects.toHaveProperty("message","Not found"); 
  })

  it('Deberia encontrar todas las fotos', async()=>{
    const fotos: FotoEntity[] = await service.findAllFotos();
    expect(fotos).not.toBeNull();
  })
});