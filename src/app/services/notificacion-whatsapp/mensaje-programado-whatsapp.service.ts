import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from 'src/environments/environment';
import { SetParamsHttpRequestService } from '../shared/set-params-httpRequest.service';
import { modelMensajeProgramadoWhatsappApiRequest, modelMensajeProgramadoWhatsappApiResponse, modelMensajeProgramadoWhatsappQueryParamsHttpRequest } from 'src/app/models/notificacion-whatsapp/model-mensaje-programado-whatsapp.models copy';
import { modelRepuestaPaginadaApiResponse } from 'src/app/models/model-response-http.models';

@Injectable({
  providedIn: 'root'
})
export class MensajeProgramadoWhatsappService {
  
  private url_api: string = environment.API_BASE_NOTIFICACION;
  private http: HttpClient = inject(HttpClient);
  private setParamsHttp: SetParamsHttpRequestService = inject(SetParamsHttpRequestService);

  public getListarMensajeProgramadoWhatsapp(searchFilter:modelMensajeProgramadoWhatsappQueryParamsHttpRequest, page: number = 1){
    return this.http.get<{data:(modelRepuestaPaginadaApiResponse & {docs?: Array<modelMensajeProgramadoWhatsappApiResponse>})}>(
      `${this.url_api}whatsapp/notificaciones/index-where`, 
      {params: this.setParamsHttp.setHttpParamsNoRelacionada(searchFilter, page)})
  }

  public postRegistroMensajeProgramadoWhatsapp(data:modelMensajeProgramadoWhatsappApiRequest){
    return this.http.post<{data:modelMensajeProgramadoWhatsappApiResponse}>(`${this.url_api}whatsapp/notificaciones`, data)
  }

  public putRegistroMensajeProgramadoWhatsapp(data:modelMensajeProgramadoWhatsappApiRequest, id:string){
    return this.http.put<{data:modelMensajeProgramadoWhatsappApiResponse}>(`${this.url_api}whatsapp/notificaciones/${id}`, data)
  }

}
