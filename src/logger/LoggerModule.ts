import { DynamicModule, Global, Module } from "@nestjs/common";
import { Logger } from "./LoggerService";
import { LoggerCoreModule } from "./LoggerCoreModule";
import { Params, ParmasAsync } from "./params";

@Module({})
export class LoggerModule {
  static forRoot(params: Params | undefined): DynamicModule {
    return {
      module: LoggerModule,
      imports: [LoggerCoreModule.forRoot(params)],
    };
  }
  static forRootAsync(params: ParmasAsync | undefined): DynamicModule {
    return {
      module: LoggerModule,
      imports: [LoggerCoreModule.forRootAsync(params)],
    };
  }
}
