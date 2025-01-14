import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Postagem } from "../entities/postagem.entity";
import { ILike, Repository, DeleteResult } from "typeorm";


@Injectable() 
export class  PostagemService{

    constructor(
        @InjectRepository(Postagem)//criar instruções sql no bd com base na minha classe model postagem
        private postagemRepository: Repository<Postagem>
    ){}

    async findAll(): Promise<Postagem[]>{
        return this.postagemRepository.find(); // SELECT * FROM Tb_postagens;
    }

    async findById(id: number): Promise <Postagem>{
// SELECT * FROM tb_postagens WHERE id = ?;
        const postagem = await this.postagemRepository.findOne({
            where:{
                id
            }
        }) // variavel que  recebe resul. da busca pra checar se é nulo

        if(!postagem) // se for nulo retorna not found
            throw new HttpException('Postagem não encontrada', HttpStatus.NOT_FOUND)

        return postagem;
    }

     async findByTitulo(titulo: string): Promise<Postagem[]>{
        return this.postagemRepository.find({
            where:{
                titulo: ILike(`%${titulo}%`)
            }
        });
     }

     async create(postagem: Postagem): Promise<Postagem>{
        // INSERT INTO tb_postagens (titulo, texto) VALUES (?, ?)
          return await this.postagemRepository.save(postagem)  
    }

    async update(postagem: Postagem): Promise<Postagem>{
        // validar se existe postagem
          await this.findById(postagem.id)
        // UPDATE tb_postagens SET titulo = postagem.titulo, texto = postagem.texto
        // data = CURRENT_TIMESTAMP() WHERE id = postagem.id
          return await this.postagemRepository.save(postagem)  
    }
    async delete(id: number): Promise<DeleteResult> {
       
        await this.findById(id);
     
        return await this.postagemRepository.delete(id);
     
}
}