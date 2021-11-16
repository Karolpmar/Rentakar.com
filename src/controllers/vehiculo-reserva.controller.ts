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
  Vehiculo,
  Reserva,
} from '../models';
import {VehiculoRepository} from '../repositories';

export class VehiculoReservaController {
  constructor(
    @repository(VehiculoRepository) protected vehiculoRepository: VehiculoRepository,
  ) { }

  @get('/vehiculos/{id}/reservas', {
    responses: {
      '200': {
        description: 'Array of Vehiculo has many Reserva',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Reserva)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Reserva>,
  ): Promise<Reserva[]> {
    return this.vehiculoRepository.reservas(id).find(filter);
  }

  @post('/vehiculos/{id}/reservas', {
    responses: {
      '200': {
        description: 'Vehiculo model instance',
        content: {'application/json': {schema: getModelSchemaRef(Reserva)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Vehiculo.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Reserva, {
            title: 'NewReservaInVehiculo',
            exclude: ['id'],
            optional: ['vehiculoId']
          }),
        },
      },
    }) reserva: Omit<Reserva, 'id'>,
  ): Promise<Reserva> {
    return this.vehiculoRepository.reservas(id).create(reserva);
  }

  @patch('/vehiculos/{id}/reservas', {
    responses: {
      '200': {
        description: 'Vehiculo.Reserva PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Reserva, {partial: true}),
        },
      },
    })
    reserva: Partial<Reserva>,
    @param.query.object('where', getWhereSchemaFor(Reserva)) where?: Where<Reserva>,
  ): Promise<Count> {
    return this.vehiculoRepository.reservas(id).patch(reserva, where);
  }

  @del('/vehiculos/{id}/reservas', {
    responses: {
      '200': {
        description: 'Vehiculo.Reserva DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Reserva)) where?: Where<Reserva>,
  ): Promise<Count> {
    return this.vehiculoRepository.reservas(id).delete(where);
  }
}
