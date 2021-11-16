import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Vehiculo, VehiculoRelations, Reserva} from '../models';
import {ReservaRepository} from './reserva.repository';

export class VehiculoRepository extends DefaultCrudRepository<
  Vehiculo,
  typeof Vehiculo.prototype.id,
  VehiculoRelations
> {

  public readonly reservas: HasManyRepositoryFactory<Reserva, typeof Vehiculo.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('ReservaRepository') protected reservaRepositoryGetter: Getter<ReservaRepository>,
  ) {
    super(Vehiculo, dataSource);
    this.reservas = this.createHasManyRepositoryFactoryFor('reservas', reservaRepositoryGetter,);
    this.registerInclusionResolver('reservas', this.reservas.inclusionResolver);
  }
}
