import { plainToClass } from 'class-transformer';
import { LessThanOrEqual, Repository, SelectQueryBuilder, MoreThanOrEqual, LessThan, MoreThan, Equal, In, Between } from 'typeorm';
export const sqlTransformMap = {
  gte: MoreThanOrEqual,
  gt: MoreThan,
  lte: LessThanOrEqual,
  lt: LessThan,
  eq: Equal,
  in: In
}
export abstract class AbstractTypeOrmService<T> {
  protected _model: Repository<T>;

  constructor(model: Repository<T>) {
    this._model = model;
  }
  public generatePaginationBuilder(
    builder: SelectQueryBuilder<T>,
    query?: any,
  ) {
    let { page = 1, pageSize = 20 } = query;
    if (query.page) {
      if (page < 1) {
        page = 1;
      }
      builder.skip((page - 1) * pageSize);
    }
    if (query.pageSize || query.page) {
      if (pageSize < 1) {
        pageSize = 1;
      }
      builder.take(pageSize);
    }
  }
  public realGenerateFilterBuilder(
    builder: SelectQueryBuilder<T>,
    filterName: string,
    filterValue: string,
  ) {
    const sqlSplit = filterValue.split(':');
    let [key1, key2OrValue1, value2, ...restValue] = sqlSplit;
    if (key1 == 'or') {
      let value;
      if (restValue) {
        value = [value2, ...restValue].join(':')
      } else {
        value = value2
      }
      let oldValue = value
      try {
        value = JSON.parse(value)
      } catch (error) {
        value = oldValue
      }
      if (sqlTransformMap[key2OrValue1]) {
        builder.orWhere({
          [`${filterName}`]: sqlTransformMap[key2OrValue1](value)
        })
      }
    } else {
      let value;
      if (value2) {
        value = [key2OrValue1, value2, ...restValue].join(':')
      } else {
        value = key2OrValue1
      }
      let oldValue = value
      try {
        value = JSON.parse(value)
      } catch (error) {
        value = oldValue
      }
      if (sqlTransformMap[key1]) {

        builder.andWhere({
          [`${filterName}`]: sqlTransformMap[key1](value)
        })
      }

    }
  }
  public generateFilterBuilder(builder: SelectQueryBuilder<T>, query?: any) {
    const { filter } = query;
    if (filter) {
      Object.keys(filter).forEach((item) => {
        if (Array.isArray(filter[item])) {
          const value = [...filter[item]];
          value.forEach((childrenItem, index) => {
            this.realGenerateFilterBuilder(builder, item, childrenItem);
          });
        } else {
          this.realGenerateFilterBuilder(builder, item, filter[item]);
        }
      });
    }
  }
  public queryBuilder(query?: any) {
    const builder = this._model.createQueryBuilder('model');
    if (query) {
      this.generatePaginationBuilder(builder, query);
      this.generateFilterBuilder(builder, query);
    }
    return builder;
  }
  public async find(query?: any): Promise<any> {
    const builder = this.queryBuilder(query).andWhere('1=1');
    return await builder.getManyAndCount();
  }
  public async create(body) {
    let createBody = this._model.create(body)
    this._model.save(createBody)
  }
  public async update(id, body) {
    let obj = await this._model.findOne(id);
    // obj = {
    //   ...obj,
    //   ...body,
    // }
    
    console.log('uodate!!')
    await this._model.update(id,body)
  }
  public async findOne(id: number, query?: any): Promise<T> {
    return await this.queryBuilder(query)
      .andWhere('id=:id', { id })
      .limit(1)
      .getOne();
  }
  public async delete(id: number): Promise<Boolean> {
    try {
      await this.queryBuilder().delete().where("id =: id", { id }).execute()
      return true
    } catch (error) {
      return false
    }
  }
}
