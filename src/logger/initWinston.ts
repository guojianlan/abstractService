import * as winston from "winston";
import { Params } from "./params";
export const container = new winston.Container();
export const init = async (params: Params) => {
  let result = await params.initWinston(winston)
  result.forEach(item => {
    container.add(item.id, item.options)
  })
};
