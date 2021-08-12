import { Module, ValidationPipe } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './user/entity';
import { ArticleEntity } from './article/entity';
import { APP_PIPE } from '@nestjs/core';
import { ArticleModule } from './article/article.module';
import { UserModule } from './user/user.module';
import { TagEntity } from './tag/entity';
import { TagModule } from './tag/tag.module';
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: '127.0.0.1',
      port: +'3306',
      username: 'root',
      database: 'test',
      password: '5201314qv',
      logging: true,
      entities: [UserEntity, ArticleEntity, TagEntity],
      synchronize: true,
    }),
    UserModule,
    ArticleModule,
    TagModule
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    },
  ],
})
export class AppModule { }
