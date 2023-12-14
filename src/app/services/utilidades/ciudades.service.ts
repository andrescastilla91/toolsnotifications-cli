import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from 'src/environments/environment';
import { SetParamsHttpRequestService } from '../shared/set-params-httpRequest.service';
import { modelCiudadesApiResponse, modelCiudadesParamsHeaders } from 'src/app/models/utilidad/ciudades.models';

@Injectable({
  providedIn: 'root'
})
export class CiudadesService {

  private url_api: string = environment.API_BASE;
  private http: HttpClient = inject(HttpClient);
  private setHttpRequest: SetParamsHttpRequestService = inject(SetParamsHttpRequestService);

  constructor() { }

  public getListadoCiudades(params?: modelCiudadesParamsHeaders){
    return this.http.get<{data:Array<modelCiudadesApiResponse>}>(`${this.url_api}ciudades/index-where`, {
      params: this.setHttpRequest.setHttpParams(params),
    });
  }
  
}
