import {injectable, /* inject, */ BindingScope} from '@loopback/core';
const generador = require("password-generator");
const cryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");

import {repository} from '@loopback/repository';
import {Llaves} from '../config/llaves';
import {Administrador, Asesor, Cliente} from '../models';
import {AdministradorRepository, AsesorRepository, ClienteRepository} from '../repositories';

@injectable({scope: BindingScope.TRANSIENT})
export class AutenticacionService {
  constructor(
  @repository(AdministradorRepository)
  public administradorRepository: AdministradorRepository,

  @repository(AsesorRepository)
  public asesorRepository: AsesorRepository,

  @repository(ClienteRepository)
  public clienteRepository: ClienteRepository) {}

  /*
   * Add service methods here
   */

GenerarClave(){
  let clave = generador(8, false);
  return clave;
}

CifrarClave(clave: string){
  let claveCifrada = cryptoJS.MD5(clave).toString();
  return claveCifrada;
}

IdentificarAdministrdor(usuario: string, clave: string) {
  try {
    let ad = this.administradorRepository.findOne({where: {correo: usuario, clave: clave}})
    if (ad) {
      return ad
    }
    return false;
  } catch {
    return false;
  }
}

IdentificarAsesor(usuario: string, clave: string) {
  try {
    let as = this.asesorRepository.findOne({where: {correo: usuario, clave: clave}})
    if (as) {
      return as
    }
    return false;
  } catch {
    return false;
  }
}

IdentificarCliente(usuario: string, clave: string) {
  try {
    let c = this.clienteRepository.findOne({where: {correo: usuario, clave: clave}})
    if (c) {
      return c
    }
    return false;
  } catch {
    return false;
  }
}

GenerarTokenJWTadmin(administrador: Administrador) {
  let token = jwt.sign({
    data: {
      id: administrador.id,
      correo: administrador.correo,
      nombre: administrador.nombres + " " + administrador.apellidos
    }
  },
    Llaves.claveJWT)
    return token;
}

GenerarTokenJWTasesor(asesor: Asesor) {
  let token = jwt.sign({
    data: {
      id: asesor.id,
      correo: asesor.correo,
      nombre: asesor.nombres + " " + asesor.apellidos
    }
  },
    Llaves.claveJWT)
    return token;
}

GenerarTokenJWTcliente(cliente: Cliente) {
  let token = jwt.sign({
    data: {
      id: cliente.id,
      correo: cliente.correo,
      nombre: cliente.nombres + " " + cliente.apellidos
    }
  },
    Llaves.claveJWT)
    return token;
}


ValidarTokenJWT(token: string) {
  try {
    let datos = jwt.verify(token, Llaves.claveJWT);
    return datos;
  } catch {
    return false;
  }
}

}
