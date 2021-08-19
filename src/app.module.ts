import { Module, ValidationPipe } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { APP_PIPE } from '@nestjs/core';
import { UserModule } from './user/user.module';
import { Logger, LoggerModule } from './logger'
@Module({
  imports: [
    LoggerModule.forRoot({
     logHttp:true,
      initWinston: async (winston) => {
        return []
      }
    }),
    UserModule,

  ],
  controllers: [AppController],
  providers: [
    Logger,
    AppService,
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    },
  ],
})
export class AppModule { }
