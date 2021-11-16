import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Reserva,
  Vehiculo,
} from '../models';
import {ReservaRepository} from '../repositories';

export class ReservaVehiculoController {
  constructor(
    @repository(ReservaRepository) protected reservaRepository: ReservaRepository,
  ) { }

  @get('/reservas/{id}/vehiculos', {
    responses: {
      '200': {
        description: 'Array of Reserva has many Vehiculo',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Vehiculo)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Vehiculo>,
  ): Promise<Vehiculo[]> {
    return this.reservaRepository.vehiculos(id).find(filter);
  }

  @post('/reservas/{id}/vehiculos', {
    responses: {
      '200': {
        description: 'Reserva model instance',
        content: {'application/json': {schema: getModelSchemaRef(Vehiculo)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Reserva.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Vehiculo, {
            title: 'NewVehiculoInReserva',
            exclude: ['id'],
            optional: ['VehiculoId']
          }),
        },
      },
    }) vehiculo: Omit<Vehiculo, 'id'>,
  ): Promise<Vehiculo> {
    return this.reservaRepository.vehiculos(id).create(vehiculo);
  }

  @patch('/reservas/{id}/vehiculos', {
    responses: {
      '200': {
        description: 'Reserva.Vehiculo PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Vehiculo, {partial: true}),
        },
      },
    })
    vehiculo: Partial<Vehiculo>,
    @param.query.object('where', getWhereSchemaFor(Vehiculo)) where?: Where<Vehiculo>,
  ): Promise<Count> {
    return this.reservaRepository.vehiculos(id).patch(vehiculo, where);
  }

  @del('/reservas/{id}/vehiculos', {
    responses: {
      '200': {
        description: 'Reserva.Vehiculo DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Vehiculo)) where?: Where<Vehiculo>,
  ): Promise<Count> {
    return this.reservaRepository.vehiculos(id).delete(where);
  }
}
