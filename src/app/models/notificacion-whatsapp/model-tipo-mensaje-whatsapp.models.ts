export type typeTipoMensaje = 'SENDTEXT'

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