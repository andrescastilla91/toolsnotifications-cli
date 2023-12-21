export interface modelRepuestaPaginadaApiResponse {
  totalDocs?: number,
  limit?: number,
  totalPages?: number,
  page?: number,
  pagingCounter?: number,
  hasPrevPage?: boolean,
  hasNextPage?: boolean,
  prevPage?: null,
  nextPage?: null
}