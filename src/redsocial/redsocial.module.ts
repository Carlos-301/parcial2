import { Module } from '@nestjs/common';
import { RedsocialService } from './redsocial.service';
import { RedsocialController } from './redsocial.controller';
import { RedsocialEntity } from './redsocial.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports:[TypeOrmModule.forFeature([RedsocialEntity])],
  providers: [RedsocialService],
  controllers: [RedsocialController]
})
export class RedsocialModule {}
