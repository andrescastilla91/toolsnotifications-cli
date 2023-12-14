import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { modelEntidadesApiRequest, modelEntidadesApiResponse } from 'src/app/models/administracion/model-entidad.models';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EntidadService {

  private url_api: string = environment.API_BASE;
  private http: HttpClient = inject(HttpClient);

  public postRegistroEntidad(data:modelEntidadesApiRequest){
    return this.http.post<{data:modelEntidadesApiResponse}>(`${this.url_api}admin/entidades`, data)
  }

  public putActualizaEntidad(data:modelEntidadesApiRequest, id:string){
    return this.http.put<{data:modelEntidadesApiResponse}>(`${this.url_api}admin/entidades/${id}`, data)
  }
  
}
