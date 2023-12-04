/* eslint-disable prettier/prettier */
import { IsDate, IsNotEmpty, IsString } from "class-validator";

export class AlbumDto {
  @IsDate()
  @IsNotEmpty()
  readonly fechainicio:Date;

  @IsDate()
  @IsNotEmpty()
  readonly fechafin:Date;

  @IsString()
  @IsNotEmpty()
  readonly titulo:string;

}
