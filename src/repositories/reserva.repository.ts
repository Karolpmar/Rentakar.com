import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor, HasManyRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Reserva, ReservaRelations, Cliente, Vehiculo} from '../models';
import {ClienteRepository} from './cliente.repository';
import {VehiculoRepository} from './vehiculo.repository';

export class ReservaRepository extends DefaultCrudRepository<
  Reserva,
  typeof Reserva.prototype.id,
  ReservaRelations
> {

  public readonly cliente: BelongsToAccessor<Cliente, typeof Reserva.prototype.id>;

  public readonly vehiculos: HasManyRepositoryFactory<Vehiculo, typeof Reserva.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('ClienteRepository') protected clienteRepositoryGetter: Getter<ClienteRepository>, @repository.getter('VehiculoRepository') protected vehiculoRepositoryGetter: Getter<VehiculoRepository>,
  ) {
    super(Reserva, dataSource);
    this.vehiculos = this.createHasManyRepositoryFactoryFor('vehiculos', vehiculoRepositoryGetter,);
    this.registerInclusionResolver('vehiculos', this.vehiculos.inclusionResolver);
    this.cliente = this.createBelongsToAccessorFor('cliente', clienteRepositoryGetter,);
    this.registerInclusionResolver('cliente', this.cliente.inclusionResolver);
  }
}
