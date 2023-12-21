import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from 'src/environments/environment';
import { SetParamsHttpRequestService } from '../shared/set-params-httpRequest.service';
import { modelDepartamentosApiResponse, modelDepartamentosParamsHeaders } from 'src/app/models/utilidad/departamentos.models';

@Injectable({
  providedIn: 'root'
})
export class DepartamentosService {

  private url_api: string = environment.API_BASE;
  private http: HttpClient = inject(HttpClient);
  private setHttpRequest: SetParamsHttpRequestService = inject(SetParamsHttpRequestService);

  constructor() { }

  public getListadoDepartamentos(params?: modelDepartamentosParamsHeaders){
    return this.http.get<{data:Array<modelDepartamentosApiResponse>}>(`${this.url_api}departamentos/index-where`, {
      params: this.setHttpRequest.setHttpParamsRelacionada(params),
    });
  }
  
}

