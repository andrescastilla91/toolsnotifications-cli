import { FormControl } from "@angular/forms";

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

