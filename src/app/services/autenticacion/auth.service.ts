import { Injectable, inject } from "@angular/core";
import { Router } from "@angular/router";
import { modelDataLocalStorage, modelInicioSesionApiResponse } from "src/app/models/autenticacion/model-inicio-sesion.models";
import { decrypt, encrypt, getDataLocalStorage } from "src/app/shared/utilidades/utilidades-encrypt";
import { environment } from "src/environments/environment";
import { MessageNotificationService } from "../shared/notification.service";
import { modelEntidadesApiResponse } from "src/app/models/administracion/model-entidad.models";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private router = inject(Router);

  /**Funcion SET Token Login */
  public setAuthorizationToken(resp: modelInicioSesionApiResponse):void{
    const setDataStorage = {token: resp.token, emailUser: resp.dataUser.email, accountVerfication: resp.status, accountSubscripcion: null, entidad: resp.data, rbac: null, statusConfig: ''}
    const localStorageData = JSON.stringify(setDataStorage);
    this.setLocalStorage(localStorageData);
  }

  /**Funcion SET acualizar data de sesion, campo accountVerfication */
  public setVerificacionCuenta(resp: boolean){
    const dataStorage:modelDataLocalStorage = JSON.parse(decrypt(localStorage.getItem(environment.KEY_SESION_LOCAL_STORAGE)!));
    this.deleteAuthorizationToken();
    dataStorage.accountVerfication = resp;
    this.setLocalStorage(JSON.stringify(dataStorage))
  }

  /**Funcion SET acualizar data de sesion, campo entidad */
  public setDataEntidad(resp: any){
    const dataStorage:modelDataLocalStorage = JSON.parse(decrypt(localStorage.getItem(environment.KEY_SESION_LOCAL_STORAGE)!));
    this.deleteAuthorizationToken();
    dataStorage.entidad = resp;
    this.setLocalStorage(JSON.stringify(dataStorage))
  }

  /**Funcion SET acualizar data de RBAC, campo rbac */
  public setPermisosUsuarioRBAC(data:Array<string>){
    const dataStorage:modelDataLocalStorage = JSON.parse(decrypt(localStorage.getItem(environment.KEY_SESION_LOCAL_STORAGE)!));
    this.deleteAuthorizationToken();
    dataStorage.rbac = data;
    this.setLocalStorage(JSON.stringify(dataStorage))
  }

  private setLocalStorage(data:string){
    const dataCifrada = encrypt(data);
    localStorage.setItem(environment.KEY_SESION_LOCAL_STORAGE, dataCifrada);
    sessionStorage.setItem(environment.KEY_SESION_LOCAL_STORAGE, dataCifrada);
  }

  get getAuthorizationToken():string | boolean {
    return getDataLocalStorage(environment.KEY_SESION_LOCAL_STORAGE, 'token');
  }

  /**Funcion GET Correo Usuario Logueado */
  get getAccountVerification():boolean {
    return getDataLocalStorage(environment.KEY_SESION_LOCAL_STORAGE, 'accountVerfication');
  }

  /**Funcion GET Correo Usuario Logueado */
  public get getEmailUser():string {
    return getDataLocalStorage(environment.KEY_SESION_LOCAL_STORAGE, 'emailUser');
  }

  //Funcion GET Datos Entidad
  public get getDataEntidad():modelEntidadesApiResponse {
    return getDataLocalStorage(environment.KEY_SESION_LOCAL_STORAGE, 'entidad');
  }

  //Funcion GET Datos Permisos RBAC
  public get getDataPermisosRBAC():Array<string> {
    return getDataLocalStorage(environment.KEY_SESION_LOCAL_STORAGE, 'rbac') ?? [];
  }

  /**Funcion SET Clear data Sesion LocalStorage */
  private deleteAuthorizationToken() {
    localStorage.removeItem(environment.KEY_SESION_LOCAL_STORAGE);
    sessionStorage.removeItem(environment.KEY_SESION_LOCAL_STORAGE);
  }

  /**Method CLOSE Sesion */
  public cerrarSesion(){
    this.deleteAuthorizationToken();
    this.router.navigate(['/']);
  }
  
}