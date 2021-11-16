import {Entity, model, property, belongsTo, hasMany} from '@loopback/repository';
import {Cliente} from './cliente.model';
import {Vehiculo} from './vehiculo.model';

@model()
export class Reserva extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'date',
    required: true,
  })
  fechaSolicitud: string;

  @property({
    type: 'boolean',
    required: true,
  })
  estado: boolean;

  @belongsTo(() => Cliente)
  clienteId: string;

  @property({
    type: 'string',
  })
  vehiculoId?: string;

  @hasMany(() => Vehiculo, {keyTo: 'VehiculoId'})
  vehiculos: Vehiculo[];

  constructor(data?: Partial<Reserva>) {
    super(data);
  }
}

export interface ReservaRelations {
  // describe navigational properties here
}

export type ReservaWithRelations = Reserva & ReservaRelations;
