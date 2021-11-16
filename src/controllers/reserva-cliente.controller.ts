import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Reserva,
  Cliente,
} from '../models';
import {ReservaRepository} from '../repositories';

export class ReservaClienteController {
  constructor(
    @repository(ReservaRepository)
    public reservaRepository: ReservaRepository,
  ) { }

  @get('/reservas/{id}/cliente', {
    responses: {
      '200': {
        description: 'Cliente belonging to Reserva',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Cliente)},
          },
        },
      },
    },
  })
  async getCliente(
    @param.path.string('id') id: typeof Reserva.prototype.id,
  ): Promise<Cliente> {
    return this.reservaRepository.cliente(id);
  }
}
