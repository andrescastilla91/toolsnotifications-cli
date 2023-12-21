import { FormControl } from "@angular/forms";

export type typeFormCuentaWhatsapp = 
  'id' |
  'usuario' |
  'razon_social' |
  'direccion' |
  'logo' |
  'estado';

export type modelFormCuentaWhatsapp = {
  [key in typeFormCuentaWhatsapp]: FormControl
}

/**REQUEST */
export interface modelCuentaWhatsappApiRequest{
  ma_entidad_id: string,
  razon_social: string,
  logo_url: string,
  direccion: string,
  usuario?: string,
  estado?: boolean,
}

export interface modelLoginCuentaWhatsappApiRequest{
  usuario: string,
}

/**RESPONSE */
export interface modelCuentaWhatsappApiResponse {
  id: string,
  ma_entidad_id: string,
  usuario: string,
  razon_social: string,
  logo_url: string,
  direccion: string,
  estado: string,
  createdAt: string,
  updatedAt: string
}

export interface modelLoginCuentaWhatsappApiResponse{
  whatsappSession?: string,
  status?: "WAITING_FOR_QRSCAN",
  url: string, //"http://api.toolsnotifications.co/storage/573154789196-qr.png"
}

/**SEARCH */
export interface modelCuentaWhatsappQueryParamsHttpRequest {
  id?: string,
  ma_entidad_id?: string,
  usuario?: string,
  razon_social?: string,
  logo_url?: string,
  direccion?: string,
  estado?: string,
}