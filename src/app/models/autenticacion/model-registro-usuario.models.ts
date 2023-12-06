import { FormControl } from "@angular/forms";

export type typeFormRegistroUsuario = 
  'nombre' | 'email' | 'clave' | 'confirma_clave';

export type modelFormRegistroUsuario = {
  [key in typeFormRegistroUsuario]: FormControl
}

export interface modelRegistroUsuarioApiRequest {
  name: string,
  email: string,
  password: string
  password_confirmation: string
}