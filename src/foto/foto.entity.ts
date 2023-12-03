/* eslint-disable prettier/prettier */

import { AlbumEntity } from '../album/album.entity';
import { UsuarioEntity } from '../usuario/usuario.entity';
import {Entity, Column, PrimaryGeneratedColumn, ManyToOne} from 'typeorm';

@Entity()
export class FotoEntity {

    @PrimaryGeneratedColumn('uuid')
    id:string;
  
    @Column()
    ISO:number;

    @Column()
    velObturacion:number;

    @Column()
    apertura:number;

    @Column()
    fecha:Date;

    @ManyToOne(()=>UsuarioEntity, usuario=>usuario.fotos)
    usuario: UsuarioEntity;

    @ManyToOne(()=>AlbumEntity, album=>album.fotos)
    album: AlbumEntity;
}
