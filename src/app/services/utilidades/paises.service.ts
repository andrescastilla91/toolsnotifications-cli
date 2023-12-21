import { Injectable } from "@angular/core";
import { modelPaisesApiResponse } from "src/app/models/utilidad/paises.models";

@Injectable({
  providedIn: 'root'
})
export class PaisesService {

  public get getLlistIndicativosPaises(): Array<modelPaisesApiResponse>{
    return [
      {codigo:'51', titulo: 'Perú'},
      {codigo:'54', titulo: 'Argentina'},
      {codigo:'55', titulo: 'Brasil'},
      {codigo:'56', titulo: 'Chile'},
      {codigo:'57', titulo: 'Colombia'},
      {codigo:'58', titulo: 'Venezuela'},
    ]
  }

}