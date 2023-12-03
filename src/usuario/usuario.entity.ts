/* eslint-disable prettier/prettier */
import { FotoEntity } from '../foto/foto.entity';
import { RedsocialEntity } from '../redsocial/redsocial.entity';
import {Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany} from 'typeorm';

@Entity()
export class UsuarioEntity {

    @PrimaryGeneratedColumn('uuid')
    id:string;
  
    @Column()
    nombre:string;

    @Column()
    telefono:string;

    @ManyToOne(()=>RedsocialEntity, redsocial=>redsocial.usuarios)
    redsocial: RedsocialEntity;

    @OneToMany(()=>FotoEntity, foto=>foto.usuario)
    fotos: FotoEntity[];
}
