import { FindConditions, FindManyOptions, Repository } from "typeorm";
export interface IWarpOptions<T> {
    baseFind?: FindManyOptions<T> | FindConditions<T>
}
export function WrapAbstractTypeOrmRepostry<T>(opts?: IWarpOptions<T>) {
    abstract class AbstractRepostry extends Repository<T> {

        mfind(options?: FindManyOptions<T> | FindConditions<T>) {
            return this.find({
                ...options,
                ...opts.baseFind
            })
        }
    }
    return AbstractRepostry as (new () => { [key in keyof AbstractRepostry]: AbstractRepostry[key] })
}