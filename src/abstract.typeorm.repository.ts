import {
  FindConditions,
  FindManyOptions,
  FindOneOptions,
  ObjectID,
  Repository,
} from 'typeorm';
export interface IWarpOptions<T> {
  baseFind?: FindManyOptions<T> | FindConditions<T>;
}
export declare class WrapAbstractTypeOrmRepositoryMethods<T> {
  mFind(options?: FindManyOptions<T>): Promise<T[]>;
  mFind(conditions?: FindConditions<T>): Promise<T[]>;
  mFindOne(
    id?: string | number | Date | ObjectID,
    options?: FindOneOptions<T>,
  ): Promise<T | undefined>;
  mFindOne(options?: FindOneOptions<T>): Promise<T | undefined>;
  mFindOne(
    conditions?: FindConditions<T>,
    options?: FindOneOptions<T>,
  ): Promise<T | undefined>;
  mFindOne(
    optionsOrConditions?:
      | string
      | number
      | Date
      | ObjectID
      | FindOneOptions<T>
      | FindConditions<T>,
    maybeOptions?: FindOneOptions<T>,
  ): Promise<T | undefined>;
}
export type mergeRepositories<T> = Repository<T> &
  WrapAbstractTypeOrmRepositoryMethods<T>;
export function WrapAbstractTypeOrmRepository<T>(opts?: IWarpOptions<T>) {
  abstract class AbstractRepository extends Repository<T> {
    mFind(options?) {
      return this.find({
        ...options,
        ...opts.baseFind,
      });
    }
    mFindOne(optionsOrConditions, maybeOptions) {
      const passedId =
        typeof optionsOrConditions === 'string' ||
        typeof optionsOrConditions === 'number' ||
        (optionsOrConditions as any) instanceof Date;
      if (passedId && maybeOptions === undefined) {
        return this.findOne(optionsOrConditions, {
          ...opts.baseFind,
        });
      } else {
        return this.findOne({
          ...(optionsOrConditions as any),
          ...maybeOptions,
          ...opts.baseFind,
        });
      }
    }
  }
  return AbstractRepository as new () => {
    [key in keyof AbstractRepository]: AbstractRepository[key];
  };
}
