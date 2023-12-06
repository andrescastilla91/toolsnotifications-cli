import { FormControl } from "@angular/forms";

export type typeFormInicioSesion = 
  'email' | 'clave';

export type modelFormInicioSesion = {
  [key in typeFormInicioSesion]: FormControl
}

export interface modelInicioSesionApiRequest {
  email: string,
  password: string
}

export interface modelInicioSesionApiResponse {
  data: any,
  dataUser: {
    email: string
  },
  message: string,
  status: boolean,
  success: boolean,
  token: string
}

export interface modelDataLocalStorage {
  token: string, 
  emailUser: string, 
  accountVerfication: boolean, 
  accountSubscripcion: boolean | null, 
  entidad: object | null,
  rbac: Array<string> | null,
}