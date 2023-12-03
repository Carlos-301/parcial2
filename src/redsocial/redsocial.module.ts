import { Module } from '@nestjs/common';
import { RedsocialService } from './redsocial.service';
import { RedsocialController } from './redsocial.controller';

@Module({
  providers: [RedsocialService],
  controllers: [RedsocialController]
})
export class RedsocialModule {}
