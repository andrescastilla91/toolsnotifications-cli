import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { map, throwError } from 'rxjs';
import { modelInicioSesionApiRequest, modelInicioSesionApiResponse } from 'src/app/models/autenticacion/model-inicio-sesion.models';
import { modelRegistroUsuarioApiRequest } from 'src/app/models/autenticacion/model-registro-usuario.models';
import { modelVerificacionCuentaApiRequest } from 'src/app/models/autenticacion/model-verificacion-cuenta.models';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AutenticacionService {

  private url_api: string = environment.API_BASE;
  private http: HttpClient = inject(HttpClient);

  public postInicioSesion(data:modelInicioSesionApiRequest){
    return this.http.post<modelInicioSesionApiResponse>(`${this.url_api}seguridad/login`, data)
  }

  public postRegistroUsuario(data:modelRegistroUsuarioApiRequest){
    return this.http.post<any>(`${this.url_api}seguridad/register`, data)
  }

  public postVerificacionCuenta(data:modelVerificacionCuentaApiRequest){
    return this.http.post<{data: boolean}>(`${this.url_api}seguridad/verify`, data)
  }

  public postReenvioCodigoVerificacionCuenta() {
    return this.http.post<any>( `${this.url_api}email/resend`, {});
  } 
  
}
