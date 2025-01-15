import { Transform, TransformFnParams } from "class-transformer";
import { IsNotEmpty } from "class-validator";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Tema } from "../../tema/entities/tema.entity";

@Entity({name: "tb_postagens"}) // CREATE TABLE tb_postagem()
export class Postagem{

@PrimaryGeneratedColumn() // AUTO_INCREMENT PRIMARY KEY
id: number;

@Transform(({ value }: TransformFnParams) => value?.trim())
@IsNotEmpty()// Validação dos dados do objeto
@Column({length: 100, nullable: false}) // Configura na tabela VARCHAR(100) NOTNULL
titulo: string;

@Transform(({ value }: TransformFnParams) => value?.trim()) // tira espaco começo e fim
@IsNotEmpty()// Validação dos dados do objeto
@Column({length: 1000, nullable: false}) // Configura na tabela VARCHAR(100) NOTNULL
texto: string;

@UpdateDateColumn() // adiciona data e hora automaticamente
data: Date; // guarda data e hora unico campo typescript 


// varias postagens associad a 1 tema .. N
@ManyToOne(() => Tema, (tema) => tema.postagem,{
    onDelete: "CASCADE" // cacasteamento, prorpeidade BD toda vez que apagar o tema, todas as postagens associadas serao apagadas 
})
tema: Tema; // inserindo um objeto da classe tema 

}

// transformar essa classe em um tabela no banco de dados, o nest ja faz construtor, get e set 