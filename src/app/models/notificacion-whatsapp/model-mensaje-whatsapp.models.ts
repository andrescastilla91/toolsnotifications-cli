import { FormControl } from "@angular/forms";

export type typeTipoMensaje = 'SENDTEXT'
export type typeFormMensajeDirectoWhatsapp = 'cuenta' | 'numero_destino' | 'tipo_mensaje' | 'mensaje';

/**FORMS */
export type modelFormMensajeDirectoWhatsapp = {
  [key in typeFormMensajeDirectoWhatsapp]: FormControl
}



/**REQUEST */
export interface modelMensajeDirectoWhatsappApiRequest{
  usuario: string,
  number: string,
  tipo_mensaje: string,
  message: string,
}

/**RESPONSE */
export interface modelTipoMensajeWhatsappApiResponse{
  id: string,
  nombre: string,
  constante: string,
  estado: string,
}

/**SEARCH */
export interface modelTipoMensajeWhatsappQueryParamsHttpRequest {
  ma_entidad_id?: string,
  constante?: typeTipoMensaje,
}
