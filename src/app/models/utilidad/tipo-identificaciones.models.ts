export interface modelTipoIdentificacionApiResponse {
  nombre: string;
  abreviatura: string;
  estado: string;
  id?: string
}

export interface modelTipoIdentificacionParamsHeaders {
  nombre?: string;
  estados?: Array<string>;
}