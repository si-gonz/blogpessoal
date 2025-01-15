import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ILike, Repository, DeleteResult } from "typeorm";
import { Postagem } from "../../postagem/entities/postagem.entity";
import { Tema } from "../entities/tema.entity";


@Injectable() 
export class  TemaService{

    constructor(
        @InjectRepository(Tema)//criar instruções sql no bd com base na minha classe model postagem
        private temaRepository: Repository<Tema>
    ){}

    async findAll(): Promise<Tema[]>{
        return this.temaRepository.find(
            {
                relations:{
                    postagem: true
                }
            }
        ); // SELECT * FROM tb_tema;
    }

    async findById(id: number): Promise <Tema>{
// SELECT * FROM tb_postagens WHERE id = ?;
        const tema = await this.temaRepository.findOne({
            where:{
                id
            },
            relations:{
                postagem: true
            }
        }) // variavel que  recebe resul. da busca pra checar se é nulo

        if(!tema) // se for nulo retorna not found
            throw new HttpException('Tema não encontrado', HttpStatus.NOT_FOUND)

        return tema;
    }

     async findByDescricao(descricao: string): Promise<Tema[]>{
        return this.temaRepository.find({
            where:{
                descricao: ILike(`%${descricao}%`)
            },
            relations:{
                postagem: true
            }
        });
     }

     async create(Tema: Tema): Promise<Tema>{
        // INSERT INTO tb_tema 
          return await this.temaRepository.save(Tema)  
    }

    async update(tema: Tema): Promise<Tema>{
        let buscaTema = await this.findById(tema.id)
        
        if (!buscaTema|| !tema.id)
            throw new HttpException('Tema não encontrado', HttpStatus.NOT_FOUND)
          return await this.temaRepository.save(tema)  
    }

    async delete(id: number): Promise<DeleteResult> {
        let buscaTema = await this.findById(id);
 
        if (!buscaTema)
            throw new HttpException('Tema não encontrado', HttpStatus.NOT_FOUND)
          
        return await this.temaRepository.delete(id);     
}
}