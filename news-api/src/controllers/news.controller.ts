import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getFilterSchemaFor,
  getModelSchemaRef,
  getWhereSchemaFor,
  patch,
  put,
  del,
  requestBody,
} from '@loopback/rest';
import {News} from '../models';
import {NewsRepository} from '../repositories';

export class NewsController {
  constructor(
    @repository(NewsRepository)
    public newsRepository : NewsRepository,
  ) {}

  @post('/news', {
    responses: {
      '200': {
        description: 'News model instance',
        content: {'application/json': {schema: {'x-ts-type': News}}},
      },
    },
  })
  async create(@requestBody() news: News): Promise<News> {
    return await this.newsRepository.create(news);
  }

  @get('/news/count', {
    responses: {
      '200': {
        description: 'News model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.query.object('where', getWhereSchemaFor(News)) where?: Where<News>,
  ): Promise<Count> {
    return await this.newsRepository.count(where);
  }

  @get('/news', {
    responses: {
      '200': {
        description: 'Array of News model instances',
        content: {
          'application/json': {
            schema: {type: 'array', items: {'x-ts-type': News}},
          },
        },
      },
    },
  })
  async find(
    @param.query.object('filter', getFilterSchemaFor(News)) filter?: Filter<News>,
  ): Promise<News[]> {
    return await this.newsRepository.find(filter);
  }

  @patch('/news', {
    responses: {
      '200': {
        description: 'News PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(News, {partial: true}),
        },
      },
    })
    news: News,
    @param.query.object('where', getWhereSchemaFor(News)) where?: Where<News>,
  ): Promise<Count> {
    return await this.newsRepository.updateAll(news, where);
  }

  @get('/news/{id}', {
    responses: {
      '200': {
        description: 'News model instance',
        content: {'application/json': {schema: {'x-ts-type': News}}},
      },
    },
  })
  async findById(@param.path.number('id') id: number): Promise<News> {
    return await this.newsRepository.findById(id);
  }

  @patch('/news/{id}', {
    responses: {
      '204': {
        description: 'News PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(News, {partial: true}),
        },
      },
    })
    news: News,
  ): Promise<void> {
    await this.newsRepository.updateById(id, news);
  }

  @put('/news/{id}', {
    responses: {
      '204': {
        description: 'News PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() news: News,
  ): Promise<void> {
    await this.newsRepository.replaceById(id, news);
  }

  @del('/news/{id}', {
    responses: {
      '204': {
        description: 'News DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.newsRepository.deleteById(id);
  }
}
