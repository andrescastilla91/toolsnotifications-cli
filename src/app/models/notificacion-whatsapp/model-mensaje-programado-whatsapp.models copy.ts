import { FormControl } from "@angular/forms";
import { typeTipoMensaje } from "./model-tipo-mensaje-whatsapp.models";


export type typeFormMensajeProgramadoWhatsapp = 
  'id' |
  'nombre' | 
  'fecha_notificacion' | 
  'tipo_notificacion' | 
  'concurrencia_envio' | 
  'cuenta' |
  'contactos_destino' |
  'tipo_mensaje' |
  'mensaje';

/**FORMS */
export type modelFormMensajeProgramadoWhatsapp = {
  [key in typeFormMensajeProgramadoWhatsapp]: FormControl
}

/**REQUEST */
export interface modelMensajeProgramadoWhatsappApiRequest{
  ma_entidad_id: string,
  nombre: string,
  fechaNotificacion: string,
  tipoNotificacion: string,
  concurrenciaNotificacion: number,
  whatsappCuenta: string,
  whatsappTipoMensaje: string
  whatsappContactos: string,
  bodyMessage: string,
  estado?: boolean,
}

/**RESPONSE */
export interface modelMensajeProgramadoWhatsappApiResponse{
  id: string,
  ma_entidad_id: number,
  nombre: string,
  fechaNotificacion: string,
  tipoNotificacion: string,
  concurrenciaNotificacion: number,
  whatsappTipoMensaje: string,
  whatsappCuenta: string,
  whatsappContactos: Array<string>
  bodyMessage: string,
  estado: boolean,
  created_at: string,
  updated_at: string,
}


/**SEARCH */
export interface modelMensajeProgramadoWhatsappQueryParamsHttpRequest {
  id?: string,
  ma_entidad_id?: string,
  
  estado?: string,
}