import { HttpRequest } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { FormControl } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ValidaFormularioService {

  public getInputStatus(formulario: any, input: string) {
    return {
      'is-invalid': formulario[input].invalid && (formulario[input].dirty || formulario[input].touched),
      'is-valid': formulario[input].valid && (formulario[input].dirty || formulario[input].touched)
    };
  }

}
