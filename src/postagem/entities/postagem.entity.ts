import { IsNotEmpty } from "class-validator";
import { Column, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({name: "tb_postagens"}) // CREATE TABLE tb_postagem()
export class Postagem{

@PrimaryGeneratedColumn() // AUTO_INCREMENT PRIMARY KEY
id: number;

@IsNotEmpty()// Validação dos dados do objeto
@Column({length: 100, nullable: false}) // Configura na tabela VARCHAR(100) NOTNULL
titulo: string;

@IsNotEmpty()// Validação dos dados do objeto
@Column({length: 1000, nullable: false}) // Configura na tabela VARCHAR(100) NOTNULL
texto: string;

@UpdateDateColumn() // adiciona data e hora automaticamente
data: Date; // guarda data e hora unico campo typescript 

}

// transformar essa classe em um tabela no banco de dados, o nest ja faz construtor, get e set 