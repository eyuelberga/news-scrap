import {DefaultCrudRepository} from '@loopback/repository';
import {News, NewsRelations} from '../models';
import {DbDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class NewsRepository extends DefaultCrudRepository<
  News,
  typeof News.prototype.id,
  NewsRelations
> {
  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
  ) {
    super(News, dataSource);
  }
}
