import { FormControl } from "@angular/forms";

export type typeFormContactosWhatsapp = 
  'id' |
  'numero_telefonico' |
  'nombre_contacto' |  
  'estado';

export type modelFormContactosWhatsapp = {
  [key in typeFormContactosWhatsapp]: FormControl
}

/**REQUEST */
export interface modelContactosWhatsappApiRequest{
  ma_entidad_id?: string,
  numero: string,
  nombre: string,
  estado?: boolean,
}

/**RESPONSE */
export interface modelContactosWhatsappApiResponse{
  id: string,
  ma_entidad_id: string,
  numero: string,
  nombre: string,
  estado?: boolean,
}

/**SEARCH */
export interface modelContactosWhatsappQueryParamsHttpRequest {
  id?: string,
  ma_entidad_id?: string,
  numero?: string,  
  nombre?: string,  
  estado?: string,
}