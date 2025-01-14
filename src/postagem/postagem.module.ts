import { Controller, Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Postagem } from "./entities/postagem.entity";
import { PostagemController } from "./controllers/postagem.controller";
import { PostagemService } from "./services/postagem.service";

@Module({
    imports: [TypeOrmModule.forFeature([Postagem])],
    controllers: [PostagemController],//definir as requisições get, post, delete 
    providers: [PostagemService], // classe regra negocio, os metodos para interagir com banco , 
    exports: [TypeOrmModule], // export acesso a estrutura appmodule
})

export class PostagemModule{}