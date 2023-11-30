/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RedsocialEntity } from './redsocial.entity';
import { BusinessError, BusinessLogicException } from 'src/shared/interceptors/business-errors/bussiness-error';

@Injectable()
export class RedsocialService {

    constructor(
        @InjectRepository(RedsocialEntity)
        private readonly redsocialRepository:Repository<RedsocialEntity>
      ){}

    async createLibreria(redsocial:RedsocialEntity){
        if (redsocial.slogan.length===0 || redsocial.slogan.length<20)
            throw new BusinessLogicException("El slogan no puede estar vacio", BusinessError.PRECONDITION_FAILED);
        return await this.redsocialRepository.save(redsocial);
    }
}
