/* eslint-disable prettier/prettier */
import { FotoEntity } from '../foto/foto.entity';
import {Entity, Column, PrimaryGeneratedColumn, OneToMany} from 'typeorm';

@Entity()
export class AlbumEntity {
    @PrimaryGeneratedColumn('uuid')
    id:string;
  
    @Column()
    titulo:string;

    @Column()
    fechainicio:Date;

    @Column()
    fechafin:Date;

    @OneToMany(()=>FotoEntity, foto=>foto.album)
    fotos: FotoEntity[];

}
