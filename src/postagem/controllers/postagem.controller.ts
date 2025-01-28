import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post, Put, UseGuards } from "@nestjs/common";
import { Postagem } from "../entities/postagem.entity";
import { PostagemService } from "../services/postagem.service";
import { JwtAuthGuard } from "../../auth/guard/jwt-auth.guard";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";

@ApiTags('Postagem')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
@Controller('/postagens') // classe recebe toda requisição que vem /postagens e responde
export class PostagemController{

    constructor (
        private readonly postagemService: PostagemService
    ){}

    @Get()
    @HttpCode(HttpStatus.OK)
    findAll(): Promise<Postagem[]> {
      return this.postagemService.findAll();
    }
   
    @Get('/:id')
    @HttpCode(HttpStatus.OK)
    findById(@Param('id', ParseIntPipe) id: number): Promise<Postagem> {
      return this.postagemService.findById(id);
    }

    @Get('/titulo/:titulo') // titulo caminho/ titulo variavel
    @HttpCode(HttpStatus.OK)
    findByTitulo(@Param('titulo') titulo: string): Promise<Postagem[]> {
      return this.postagemService.findByTitulo(titulo);
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    // procurar a requisição no corpo
    create(@Body() postagem: Postagem): Promise<Postagem>{
        return this.postagemService.create(postagem)
    }

    @Put()
    @HttpCode(HttpStatus.OK)
    // procurar a requisição no corpo
    update(@Body() postagem: Postagem): Promise<Postagem>{
        return this.postagemService.update(postagem)
    }

    @Delete('/:id')
    @HttpCode(HttpStatus.NO_CONTENT) // no content 204 o conteudo nao existe 
    delete(@Param('id', ParseIntPipe) id: number){
      return this.postagemService.delete(id);
    }
}