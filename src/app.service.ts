import { Inject, Injectable, LoggerService } from '@nestjs/common';
import { WINSTON_TOKEN ,Logger} from 'nestjs-log-module'
@Injectable()
export class AppService {
  constructor(

    @Inject(WINSTON_TOKEN) private readonly redisService: Logger,
  ) {
    this.redisService.log('123')
  }

  getHello(): string {
    return "hello world"
  }

}
