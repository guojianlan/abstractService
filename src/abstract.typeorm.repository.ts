import { BadRequestException } from '@nestjs/common';
import {
  EntityTarget,
  FindConditions,
  FindManyOptions,
  FindOneOptions,
  In,
  Not,
  ObjectID,
  Repository,
  TypeORMError,
} from 'typeorm';
import { SoftDeleteQueryBuilder } from 'typeorm/query-builder/SoftDeleteQueryBuilder';
let a = (SoftDeleteQueryBuilder as any).prototype.createUpdateExpression
console.log(a);
(SoftDeleteQueryBuilder as any).prototype.createUpdateExpression = () => {
  console.log('custom')
  a()
}
import { SelectQueryBuilder } from 'typeorm/query-builder/SelectQueryBuilder';
// let  = SelectQueryBuilder.prototype.getQuery
let b = SelectQueryBuilder.prototype.getQuery
SelectQueryBuilder.prototype.getQuery = function () {
  let c = b.bind(this)
  let str = c();
  return c()
}
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
  mSoftDelete(criteria: string | string[] | number | number[] | Date | Date[] | ObjectID | ObjectID[] | FindConditions<T>): Promise<T>;
}
export type mergeRepositories<T> = Repository<T> &
  WrapAbstractTypeOrmRepositoryMethods<T>;
export function WrapAbstractTypeOrmRepository<T>(opts?: IWarpOptions<T>) {
  abstract class AbstractRepository extends Repository<T> {
    mFind(options?: FindManyOptions<T>): Promise<T[]>;
    mFind(conditions?: FindConditions<T>): Promise<T[]>;
    mFind(options?: FindManyOptions<T> | FindConditions<T>) {

      let filterOptions = {
        ...options,
        ...opts.baseFind
      }
      console.log(filterOptions)
      return this.find(filterOptions);
    }
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
    mFindOne(optionsOrConditions?: | string
      | number
      | Date
      | ObjectID
      | FindOneOptions<T>
      | FindConditions<T>, maybeOptions?: FindOneOptions<T>) {
      const passedId =
        typeof optionsOrConditions === 'string' ||
        typeof optionsOrConditions === 'number' ||
        (optionsOrConditions as any) instanceof Date;
      if (passedId && maybeOptions === undefined) {
        return this.findOne(optionsOrConditions, {
          where: {
            ...opts.baseFind,
          }
        });
      } else {
        return this.findOne({
          ...(optionsOrConditions as any),
          ...maybeOptions,
          where: {
            ...opts.baseFind,
          }
        });
      }
    }
    async mSoftDelete(criteria: string | string[] | number | number[] | Date | Date[] | ObjectID | ObjectID[] | FindConditions<T>) {
      if (criteria === undefined ||
        criteria === null ||
        criteria === "" ||
        (Array.isArray(criteria) && criteria.length === 0)) {

        return Promise.reject(new TypeORMError(`Empty criteria(s) are not allowed for the delete method.`));
      }
      let result: any[] | undefined
      if (typeof criteria === "string" ||
        typeof criteria === "number" ||
        criteria instanceof Date ||
        Array.isArray(criteria)) {

        result = await this.mFind({
          id: In(criteria as any)
        } as any);

      } else {
        result = await this.mFind(criteria as any);
        return result
      }
      if (result && result.length > 0) {
        result.forEach((item) => {
          item['dtime'] = ~~(+new Date() / 1000);
        })
        return this.save(result)
      } else {
        throw new BadRequestException('entity is exits')
      }
    }
  }
  return AbstractRepository as new () => {
    [key in keyof AbstractRepository]: AbstractRepository[key];
  };
}
