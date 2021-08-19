import { Inject } from "@nestjs/common";

export const PARAMS_PROVIDER_TOKEN = "winston-params";
export const WINSTON_TOKEN = 'winston'

export const InjectWinston = () => Inject(WINSTON_TOKEN)