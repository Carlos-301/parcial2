/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsString } from "class-validator";

export class RedsocialDto {
    @IsString()
    @IsNotEmpty()
    readonly nombre:string;

    @IsString()
    @IsNotEmpty()
    readonly slogan:string;
}
