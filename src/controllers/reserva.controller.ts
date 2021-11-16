import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {Reserva} from '../models';
import {ReservaRepository} from '../repositories';

export class ReservaController {
  constructor(
    @repository(ReservaRepository)
    public reservaRepository : ReservaRepository,
  ) {}

  @post('/reservas')
  @response(200, {
    description: 'Reserva model instance',
    content: {'application/json': {schema: getModelSchemaRef(Reserva)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Reserva, {
            title: 'NewReserva',
            exclude: ['id'],
          }),
        },
      },
    })
    reserva: Omit<Reserva, 'id'>,
  ): Promise<Reserva> {
    return this.reservaRepository.create(reserva);
  }

  @get('/reservas/count')
  @response(200, {
    description: 'Reserva model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Reserva) where?: Where<Reserva>,
  ): Promise<Count> {
    return this.reservaRepository.count(where);
  }

  @get('/reservas')
  @response(200, {
    description: 'Array of Reserva model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Reserva, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Reserva) filter?: Filter<Reserva>,
  ): Promise<Reserva[]> {
    return this.reservaRepository.find(filter);
  }

  @patch('/reservas')
  @response(200, {
    description: 'Reserva PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Reserva, {partial: true}),
        },
      },
    })
    reserva: Reserva,
    @param.where(Reserva) where?: Where<Reserva>,
  ): Promise<Count> {
    return this.reservaRepository.updateAll(reserva, where);
  }

  @get('/reservas/{id}')
  @response(200, {
    description: 'Reserva model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Reserva, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Reserva, {exclude: 'where'}) filter?: FilterExcludingWhere<Reserva>
  ): Promise<Reserva> {
    return this.reservaRepository.findById(id, filter);
  }

  @patch('/reservas/{id}')
  @response(204, {
    description: 'Reserva PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Reserva, {partial: true}),
        },
      },
    })
    reserva: Reserva,
  ): Promise<void> {
    await this.reservaRepository.updateById(id, reserva);
  }

  @put('/reservas/{id}')
  @response(204, {
    description: 'Reserva PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() reserva: Reserva,
  ): Promise<void> {
    await this.reservaRepository.replaceById(id, reserva);
  }

  @del('/reservas/{id}')
  @response(204, {
    description: 'Reserva DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.reservaRepository.deleteById(id);
  }
}
