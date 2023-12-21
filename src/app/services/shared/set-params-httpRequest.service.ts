import { HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root',
})
export class SetParamsHttpRequestService {

  constructor() {}

  public setHttpParamsRelacionada(params:any): HttpParams{
    let dataParams:any = {};
    if(params){
      const list:Array<string> = Object.keys(params);
      dataParams = list.reduce((obj, clave) => {
        const value = params[clave];
        if(Array.isArray(value)) clave = `${clave}[]`;
        obj[clave] = value;
        return obj;
      }, {} as { [clave: string]: any });
    }
    let param = new HttpParams({fromObject: dataParams});
    return param;
  }

  public setHttpParamsNoRelacionada(searchFilter:any, page:number): any{
    let param:any = {'page': `${page}`};
    if(searchFilter){
      Object.entries(searchFilter).forEach(([key, value]) => {
        if(value) param[`${key}`] = `"${value}"`
      });
    }
    return param
  }

}