/* eslint-disable prettier/prettier */
import { UsuarioEntity } from 'src/usuario/usuario.entity';
import {Entity, Column, PrimaryGeneratedColumn, OneToMany} from 'typeorm';

@Entity()
export class RedsocialEntity {
    @PrimaryGeneratedColumn('uuid')
    id:string;
  
    @Column()
    nombre:string;

    @Column()
    slogan:string;

    @OneToMany(()=>UsuarioEntity, usuario=>usuario.redsocial)
    usuarios: UsuarioEntity[];
}
