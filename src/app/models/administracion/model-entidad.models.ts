import { FormControl } from "@angular/forms";

export type typeFormEntidad = 
  'id' |
  'razon_social' |
  'tipo_identificacion' |
  'identificacion' |
  'direccion' |
  'departamento' |
  'ciudad' |
  'telefonos' |
  'descripcion' |
  'estado';

export type modelFormEntidad = {
  [key in typeFormEntidad]: FormControl
}

export interface modelEntidadesApiRequest{
  razon_social: string,
  utilidad_tipo_identificacion_id: string,
  identificacion: string,
  direccion: string,
  utilidad_departamento_id: number,
  utilidad_ciudad_id: number,
  telefonos: string,
  descripcion: string,
  estado?: string,
  id?: string,
}

export interface modelEntidadesApiResponse {
  id?: string,
  razon_social?: string,
  utilidad_tipo_identificacion_id?: string,
  identificacion?: string,
  direccion?: string,
  utilidad_departamento_id?: number,
  utilidad_ciudad_id?: number,
  telefonos?: string,
  descripcion?: string,
  estado?: string
}

    