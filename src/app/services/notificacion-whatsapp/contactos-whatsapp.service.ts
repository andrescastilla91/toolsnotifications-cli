import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from 'src/environments/environment';
import { SetParamsHttpRequestService } from '../shared/set-params-httpRequest.service';
import { modelContactosWhatsappApiRequest, modelContactosWhatsappApiResponse, modelContactosWhatsappQueryParamsHttpRequest } from 'src/app/models/notificacion-whatsapp/model-contactos-whatsapp.models';
import { modelRepuestaPaginadaApiResponse } from 'src/app/models/model-response-http.models';

@Injectable({
  providedIn: 'root'
})
export class ContactosWhatsappService {
  
  private url_api: string = environment.API_BASE_NOTIFICACION;
  private http: HttpClient = inject(HttpClient);
  private setParamsHttp: SetParamsHttpRequestService = inject(SetParamsHttpRequestService);

  public postRegistroContactosWhatsapp(data:modelContactosWhatsappApiRequest){
    return this.http.post<{data:modelContactosWhatsappApiResponse}>(`${this.url_api}whatsapp/contactos`, data)
  }

  public putActualizaContactosWhatsapp(data:modelContactosWhatsappApiRequest, id:string){
    return this.http.put<{data:modelContactosWhatsappApiResponse}>(`${this.url_api}whatsapp/contactos/${id}`, data)
  }

  public getListarContactosWhatsapp(searchFilter:modelContactosWhatsappQueryParamsHttpRequest, page: number = 1){
    return this.http.get<{data:(modelRepuestaPaginadaApiResponse & {docs?: Array<modelContactosWhatsappApiResponse>})}>(
      `${this.url_api}whatsapp/contactos/index-where`, 
      {params: this.setParamsHttp.setHttpParamsNoRelacionada(searchFilter, page)})
  }

  public getConsultaContactosWhatsapp(id:string){
    return this.http.get<{data:modelContactosWhatsappApiResponse}>(
      `${this.url_api}whatsapp/contactos/${id}`)
  }

}
