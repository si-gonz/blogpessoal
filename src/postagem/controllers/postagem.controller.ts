import { Controller, Get, HttpCode, HttpStatus } from "@nestjs/common";
import { PostagemService } from "../services/postagem.service";
import { Postagem } from "../entities/postagem.entity";

@Controller('/postagens') // classe recebe toda requisição que vem /postagens e responde
export class PostagemController{

    constructor (
        private readonly postagemService: PostagemService
    ){}

    @Get()
    @HttpCode(HttpStatus.OK)
    findall(): Promise<Postagem[]>{
        return this.postagemService.findAll();
    }

}