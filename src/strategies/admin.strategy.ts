import { AuthenticationStrategy } from "@loopback/authentication";
import { service } from "@loopback/core";
import { UserProfile } from "@loopback/security";
import parseBearerToken from 'parse-bearer-token';
import { AutenticacionService } from '../services';
import {HttpErrors, Request} from '@loopback/rest';

export class EstrategiaAdministrador implements AuthenticationStrategy{
    name: string = 'admin';

constructor(
    @service(AutenticacionService)
    public servicioAutenticacion: AutenticacionService
){

}

async authenticate(request: Request): Promise<UserProfile | undefined>{
    let token = parseBearerToken(request);
    if(token){
        let datos = this.servicioAutenticacion.ValidarTokenJWTadmin(token);
        if(datos){
            let perfilAdmin: UserProfile = Object.assign({
                nombre: datos.dataAdmin.nombre
            });
            return perfilAdmin;

            }else{
                throw new HttpErrors[401]("El token incluido no es válido")
            }
    

        }else{
            throw new HttpErrors[401]("No se ha incluido un token en la solicitud")
        }        
        
    }

}


export class EstrategiaCliente implements AuthenticationStrategy{
    name: string = 'cliente';

constructor(
    @service(AutenticacionService)
    public servicioAutenticacion: AutenticacionService
){

}

async authenticate(request: Request): Promise<UserProfile | undefined>{
    let token = parseBearerToken(request);
    if(token){
        let datos = this.servicioAutenticacion.ValidarTokenJWTcliente(token);
        if(datos){
            let perfilCliente: UserProfile = Object.assign({
                nombre: datos.dataCliente.nombre
            });
            return perfilCliente;

            }else{
                throw new HttpErrors[401]("El token incluido no es válido")
            }
    

        }else{
            throw new HttpErrors[401]("No se ha incluido un token en la solicitud")
        }        
        
    }

}

export class EstrategiaAsesor implements AuthenticationStrategy{
    name: string = 'asesor';

constructor(
    @service(AutenticacionService)
    public servicioAutenticacion: AutenticacionService
){

}

async authenticate(request: Request): Promise<UserProfile | undefined>{
    let token = parseBearerToken(request);
    if(token){
        let datos = this.servicioAutenticacion.ValidarTokenJWTasesor(token);
        if(datos){
            let perfilAsesor: UserProfile = Object.assign({
                nombre: datos.dataAsesor.nombre
            });
            return perfilAsesor;

            }else{
                throw new HttpErrors[401]("El token incluido no es válido")
            }
    

        }else{
            throw new HttpErrors[401]("No se ha incluido un token en la solicitud")
        }        
        
    }

}
