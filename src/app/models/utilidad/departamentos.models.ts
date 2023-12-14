export interface modelDepartamentosApiResponse {
  nombre: string;
  estado: string;
  id?: string | null,
}

export interface modelDepartamentosParamsHeaders {
  nombre?: string;
  estados?: string | Array<string>;
}
