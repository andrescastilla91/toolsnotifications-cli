import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { modelCuentaWhatsappApiRequest, modelCuentaWhatsappApiResponse, modelCuentaWhatsappQueryParamsHttpRequest, modelLoginCuentaWhatsappApiRequest, modelLoginCuentaWhatsappApiResponse } from 'src/app/models/notificacion-whatsapp/model-cuenta-whatsapp.models';
import { environment } from 'src/environments/environment';
import { SetParamsHttpRequestService } from '../shared/set-params-httpRequest.service';
import { modelRepuestaPaginadaApiResponse } from 'src/app/models/model-response-http.models';

@Injectable({
  providedIn: 'root'
})
export class CuentasWhatsappService {

  private url_api: string = environment.API_BASE_NOTIFICACION;
  private http: HttpClient = inject(HttpClient);
  private setParamsHttp: SetParamsHttpRequestService = inject(SetParamsHttpRequestService);

  public postRegistroCuentasWhatsapp(data:modelCuentaWhatsappApiRequest){
    return this.http.post<{data:modelCuentaWhatsappApiResponse}>(`${this.url_api}whatsapp/cuentas`, data)
  }

  public putActualizaCuentasWhatsapp(data:modelCuentaWhatsappApiRequest, id:string){
    return this.http.put<{data:modelCuentaWhatsappApiResponse}>(`${this.url_api}whatsapp/cuentas/${id}`, data)
  }

  public getListarCuentasWhatsapp(searchFilter:modelCuentaWhatsappQueryParamsHttpRequest, page: number = 1){
    return this.http.get<{data:(modelRepuestaPaginadaApiResponse & {docs?: Array<modelCuentaWhatsappApiResponse>})}>(
      `${this.url_api}whatsapp/cuentas/index-where`, 
      {params: this.setParamsHttp.setHttpParamsNoRelacionada(searchFilter, page)})
  }

  public getConsultaCuentasWhatsapp(id:string){
    return this.http.get<{data:modelCuentaWhatsappApiResponse}>(
      `${this.url_api}whatsapp/cuentas/${id}`)
  }

  /** */

  public postRegistroLoginCuentasWhatsapp(data:modelLoginCuentaWhatsappApiRequest){
    return this.http.post<modelLoginCuentaWhatsappApiResponse>(`${this.url_api}whatsapp/session`, data)
  }
  
}
