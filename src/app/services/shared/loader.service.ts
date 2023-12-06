import { HttpRequest } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  public estado:EventEmitter<boolean> = new EventEmitter();

  private listPeticionesEnviadas: Array<HttpRequest<any>> = [];

  constructor() { }

  addPeticion(req:HttpRequest<any>){
    this.listPeticionesEnviadas.push(req);
    this.estado.emit(true);
  }

  deletePeticion(){
    this.listPeticionesEnviadas.pop();
    if(!this.listPeticionesEnviadas.length) {
      this.estado.emit(false);
    } 
  }

}
