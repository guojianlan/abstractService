import {
  ConsoleLogger,
  DynamicModule,
  Global,
  Inject,
  MiddlewareConsumer,
  Module,
  NestModule,
} from "@nestjs/common";
import { PARAMS_PROVIDER_TOKEN, WINSTON_TOKEN, InjectWinston } from "./contants";
import { Logger } from "./LoggerService";
import { Params, ParmasAsync } from "./params";
import { init } from "./initWinston";
import { NextFunction, Request, Response } from "express";
@Global()
@Module({})
export class LoggerCoreModule implements NestModule {
  static forRoot(params: Params | undefined): DynamicModule {
    const moduleOptions: Partial<DynamicModule> = {};

    return Object.assign(moduleOptions, {
      module: LoggerCoreModule,
      providers: [
        {
          provide: PARAMS_PROVIDER_TOKEN,
          useValue: params,
        },
        {
          provide: WINSTON_TOKEN,
          useFactory: async (params: any) => {
            await init(params);
            return new Logger();
          },
          inject: [PARAMS_PROVIDER_TOKEN],

        },
      ],
      exports: [WINSTON_TOKEN]
    });
  }
  static forRootAsync(params: ParmasAsync | undefined): DynamicModule {
    const moduleOptions: Partial<DynamicModule> = {};

    return Object.assign(moduleOptions, {
      module: LoggerCoreModule,
      imports: params.imports,
      providers: [
        {
          provide: PARAMS_PROVIDER_TOKEN,
          useFactory: params.useFactory,
          inject: params.inject,
        },
        {
          provide: WINSTON_TOKEN,
          useFactory: async (params: any) => {
            await init(params);
            return new Logger();
          },
          inject: [PARAMS_PROVIDER_TOKEN],
        },
      ],
      exports: [WINSTON_TOKEN]
    });
  }
  constructor(
    @Inject(PARAMS_PROVIDER_TOKEN) private readonly params: Params,
    @InjectWinston() private readonly logger: Logger
  ) { }
  configure(consumer: MiddlewareConsumer) {
    console.log(this.params);
    if (this.params.logHttp) {
      if (typeof this.params.logHttp == 'boolean') {
        // 如果是boolean，直接使用middleware记录
        consumer.apply((req: Request, res: Response, next: NextFunction) => {
          console.log(req.baseUrl);
          next()
        }).forRoutes('*')
      } else {

      }
    }

  }
}
