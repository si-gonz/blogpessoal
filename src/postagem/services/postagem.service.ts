import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Postagem } from "../entities/postagem.entity";
import { Repository } from "typeorm";

@Injectable() 
export class  PostagemService{

    constructor(
        @InjectRepository(Postagem)//criar instruções sql no bd com base na minha classe model postagem
        private postagemRepository: Repository<Postagem>
    ){}

    async findAll(): Promise<Postagem[]>{
        return this.postagemRepository.find(); // SELECT * FROM Tb_postagens;
    }

}