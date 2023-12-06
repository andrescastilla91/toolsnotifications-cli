import { FormControl } from "@angular/forms";

export type typeFormVerificacionCuenta = 
  'codigo';

export type modelFormVerificacionCuenta = {
  [key in typeFormVerificacionCuenta]: FormControl
}

export interface modelVerificacionCuentaApiRequest {
  codigo_activacion: string,
}