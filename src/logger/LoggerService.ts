import { Injectable, LoggerService } from "@nestjs/common";
import {container} from './initWinston';
@Injectable()
export class Logger implements LoggerService {
  constructor() {
   
  }
  log(message: string) {
    console.log(message, "LoggerService");
    container.get('xx').error(message)
  }
  error(){
    console.log(123)
  }
  warn(){

  }
}
