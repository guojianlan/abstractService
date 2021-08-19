import { ModuleMetadata } from "@nestjs/common/interfaces";
import * as winston from 'winston'
export type WinstonClass = {
  format: typeof winston.format,
  transports: typeof winston.transports
}
export type winstonParsme = { id: string, options?: winston.LoggerOptions }[]
export interface Params {
  logHttp?: {}
  initWinston?: (winston: WinstonClass) => Promise<winstonParsme> | winstonParsme
}

export interface ParmasAsync extends Pick<ModuleMetadata, "imports"> {
  inject?: any[];
  useFactory?: (...args: any[]) => Params | Promise<Params>;
}
