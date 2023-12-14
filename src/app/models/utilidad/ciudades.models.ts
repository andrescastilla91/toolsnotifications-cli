export interface modelCiudadesApiResponse {
  id: string,
  utilidad_departamento_id: string;
  nombre: string;
  estado: string;
}

export interface modelCiudadesParamsHeaders {
  departamento_id?: number;
  nombre?: string;
  estados?: string | Array<string>;
}
