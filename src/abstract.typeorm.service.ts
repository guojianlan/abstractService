import {
  LessThanOrEqual,
  Repository,
  SelectQueryBuilder,
  MoreThanOrEqual,
  LessThan,
  MoreThan,
  Equal,
  In,
  InsertResult,
  EntityTarget,
  Not,
} from 'typeorm';
import {
  mergeRepositories,
} from './abstract.typeorm.repository';

export const sqlTransformMap = {
  gte: MoreThanOrEqual,
  gt: MoreThan,
  lte: LessThanOrEqual,
  lt: LessThan,
  eq: Equal,
  in: In,
};
export abstract class AbstractTypeOrmService<T> {
  protected _model: Repository<T>;
  protected _entity: EntityTarget<T>;
  protected builder: SelectQueryBuilder<T>
  constructor(model: Repository<T>, _entity: EntityTarget<T>) {
    this._model = model;
    this._entity = _entity;
    this.builder = this._model.createQueryBuilder('model');
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
    const [key1, key2OrValue1, value2, ...restValue] = sqlSplit;
    if (key1 == 'or') {
      let value;
      if (restValue) {
        value = [value2, ...restValue].join(':');
      } else {
        value = value2;
      }
      const oldValue = value;
      try {
        value = JSON.parse(value);
      } catch (error) {
        value = oldValue;
      }
      if (sqlTransformMap[key2OrValue1]) {
        builder.orWhere({
          [`${filterName}`]: sqlTransformMap[key2OrValue1](value),
        });
      }
    } else {
      let value;
      if (value2) {
        value = [key2OrValue1, value2, ...restValue].join(':');
      } else {
        value = key2OrValue1;
      }
      const oldValue = value;
      try {
        value = JSON.parse(value);
      } catch (error) {
        value = oldValue;
      }
      if (sqlTransformMap[key1]) {
        builder.andWhere({
          [`${filterName}`]: sqlTransformMap[key1](value),
        });
      }
    }
  }
  public generateFilterBuilder(builder: SelectQueryBuilder<T>, query?: any) {
    const { filter } = query;
    if (filter) {
      Object.keys(filter).forEach((item) => {
        if (Array.isArray(filter[item])) {
          const value = [...filter[item]];
          value.forEach((childrenItem) => {
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
  public async addDeleteConditon(builder: SelectQueryBuilder<T>) {
    builder
    return builder
  }
  public async find(query?: any): Promise<any> {
    const builder = this.queryBuilder(query).andWhere('1=1');
    return await builder.getManyAndCount();
  }

  public async create(body): Promise<T[] | InsertResult> {
    const createBody = this._model.create(body);
    return await this._model.save(createBody);
  }
  public async update(id, body): Promise<T> {
    const entity = await this._model.findOne(id);
    return await this._model.save(Object.assign(entity, body));
  }
  public async findOne(id: number, query?: any): Promise<T> {
    return await (this._model as any).findOne(id)
  }
  public async delete(id: number): Promise<any> {
    try {
      return await this._model.softDelete(id)
    } catch (error) {
      console.log(error)
      return false;
    }
  }
}
