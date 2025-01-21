import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostagemModule } from './postagem/postagem.module';
import { Postagem } from './postagem/entities/postagem.entity';
import { Tema } from './tema/entities/tema.entity';
import { TemaModule } from './tema/services/tema.module';
import { AuthModule } from './auth/auth.module';
import { UsuarioModule } from './auth/usuario/usuario.module';
import { Usuario } from './auth/usuario/entities/usuario.entity';
import { Bcrypt } from './auth/bcrypt/bcrypt';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database:'db_blogpessoal',
      entities: [Postagem, Tema, Usuario], 
      synchronize: true, 
      logging: true 
    }),
    PostagemModule,
    TemaModule,
    AuthModule,
    UsuarioModule

  ],
  controllers: [],
  providers: [],
})
export class AppModule {}



// responsavel por subir a aplicação, todos os recursos que construirmos vamos registrar dentro da app module. Quando criarmos tema, usuários e segurança vamos registrr aqui para que o nest saiba que eles existam. Não carrega quando inicializa app. start:dev inicializa a app em modo dev