import { ModuleMetadata } from "@nestjs/common/interfaces";
import * as winstonClass from 'winston'
export type winstonParsme = { id: string, options?: winstonClass.LoggerOptions }[]
export interface Params {
  logHttp?: {
    container:string
  } | boolean
  initWinston?: (winston: typeof winstonClass) => Promise<winstonParsme> | winstonParsme
}

export interface ParmasAsync extends Pick<ModuleMetadata, "imports"> {
  inject?: any[];
  useFactory?: (...args: any[]) => Params | Promise<Params>;
}
