import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-validacion-formulario',
  templateUrl: './validacion-formulario.component.html'
})
export class ValidacionFormularioComponent {
  @Input() validacion: {formulario: any, input: string} | any;
}
