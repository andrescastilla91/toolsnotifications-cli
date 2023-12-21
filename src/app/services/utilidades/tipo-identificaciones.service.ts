import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { modelTipoIdentificacionApiResponse, modelTipoIdentificacionParamsHeaders } from 'src/app/models/utilidad/tipo-identificaciones.models';
import { environment } from 'src/environments/environment';
import { SetParamsHttpRequestService } from '../shared/set-params-httpRequest.service';

@Injectable({
  providedIn: 'root'
})
export class TipoIdentificacionesService {

  private url_api: string = environment.API_BASE;
  private http: HttpClient = inject(HttpClient);
  private setHttpRequest: SetParamsHttpRequestService = inject(SetParamsHttpRequestService);

  constructor() { }

  public getListadoTipoIdentificacion(params?: modelTipoIdentificacionParamsHeaders){
    return this.http.get<{data:Array<modelTipoIdentificacionApiResponse>}>(`${this.url_api}tipo-identificaciones/index-where`, {
      params: this.setHttpRequest.setHttpParamsRelacionada(params),
    });
  }
}
