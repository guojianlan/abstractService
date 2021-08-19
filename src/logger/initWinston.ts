import * as winston from "winston";
import { Params } from "./params";
export const container = new winston.Container();
export const init = async (params: Params) => {
  console.log('params');
  let result = await params.initWinston(winston)
  
  console.log(result)
};
