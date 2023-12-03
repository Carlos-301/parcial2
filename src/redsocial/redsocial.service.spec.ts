/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { RedsocialService } from './redsocial.service';
import { TypeOrmTestingConfig } from '../shared/testing-utils/typeorm-testing-config';
import { RedsocialEntity } from './redsocial.entity';

describe('RedsocialService', () => {
  let service: RedsocialService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports:[...TypeOrmTestingConfig()],
      providers: [RedsocialService],
    }).compile();

    service = module.get<RedsocialService>(RedsocialService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('Deberia crear una red social correctamente', async ()=>{
    const redsocial:RedsocialEntity = {
      id:"1",
      nombre:"twitter 2",
      slogan:"idk compremos la tierra",
      usuarios:[]
    }
    const newRedsocial: RedsocialEntity = await service.createLibreria(redsocial);
    expect(newRedsocial).not.toBeNull();
  })

  it('Deberia fallar al crear una red social', async ()=>{
    const redsocial:RedsocialEntity = {
      id:"1",
      nombre:"whatsapp",
      slogan:"",
      usuarios:[]
    }
    await expect(()=> service.createLibreria(redsocial)).rejects.toHaveProperty("message","El slogan no puede estar vacio");
  })

});
