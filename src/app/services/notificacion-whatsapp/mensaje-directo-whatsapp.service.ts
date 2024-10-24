import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from 'src/environments/environment';
import { SetParamsHttpRequestService } from '../shared/set-params-httpRequest.service';
import { modelMensajeDirectoWhatsappApiRequest } from 'src/app/models/notificacion-whatsapp/model-mensaje-whatsapp.models';

@Injectable({
  providedIn: 'root'
})
export class MensajeDirectoWhatsappService {

  private url_api: string = environment.API_BASE_NOTIFICACION;
  private http: HttpClient = inject(HttpClient);
  private setParamsHttp: SetParamsHttpRequestService = inject(SetParamsHttpRequestService);

  public postRegistroMensajeDirectoWhatsapp(data:modelMensajeDirectoWhatsappApiRequest){
    return this.http.post<{data:any}>(`${this.url_api}whatsapp/mensajes`, data)
  }


}
