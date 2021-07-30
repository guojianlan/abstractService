import { LessThanOrEqual, Repository, SelectQueryBuilder } from 'typeorm';

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
    index?: number,
  ) {
    const sqlSplit = filterValue.split(':');
    const filterNameKey = index ? filterName + index : filterName;
    if (sqlSplit[0] == 'or') {
      if (sqlSplit[1] == 'gte') {
        builder.orWhere(`model.${filterName} >= :${filterNameKey}`, {
          [`${filterNameKey}`]: sqlSplit[2],
        });
      }
      if (sqlSplit[1] == 'lte') {
        builder.orWhere(`model.${filterName} <= :${filterNameKey}`, {
          [`${filterNameKey}`]: sqlSplit[2],
        });
      }
    }
    if (sqlSplit[0] == 'gte') {
      builder.andWhere(`model.${filterName} >= :${filterNameKey}`, {
        [`${filterNameKey}`]: sqlSplit[1],
      });
    }
    if (sqlSplit[0] == 'lte') {
      builder.andWhere(`model.${filterName} <= :${filterNameKey}`, {
        [`${filterNameKey}`]: sqlSplit[1],
      });
    }
  }
  public generateFilterBuilder(builder: SelectQueryBuilder<T>, query?: any) {
    const { filter } = query;
    if (filter) {
      Object.keys(filter).forEach((item) => {
        if (Array.isArray(filter[item])) {
          const value = [...filter[item]];
          value.forEach((childrenItem, index) => {
            this.realGenerateFilterBuilder(builder, item, childrenItem, index);
          });
        } else {
          this.realGenerateFilterBuilder(builder, item, filter[item]);
        }
      });
    }
    builder.andWhere({
      sex: LessThanOrEqual(10),
    });
  }
  public queryBuilder(query?: any) {
    const builder = this._model.createQueryBuilder('model');
    this.generatePaginationBuilder(builder, query);
    this.generateFilterBuilder(builder, query);
    return builder;
  }
  public async find(query?: any): Promise<any> {
    const builder = this.queryBuilder(query).andWhere('1=1');
    return await builder.getManyAndCount();
  }
  public async findOne(id: number, query?: any): Promise<T> {
    return await this.queryBuilder(query)
      .andWhere('id=:id', { id })
      .limit(1)
      .getOne();
  }
}
