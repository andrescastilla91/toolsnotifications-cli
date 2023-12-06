import { HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AuthService } from "../../services/autenticacion/auth.service";
import { Router } from "@angular/router";
import { LoaderService } from "../../services/shared/loader.service";
import { MessageNotificationService } from "../../services/shared/notification.service";
import { throwError } from "rxjs";

@Injectable()
export class RequestInterceptor implements HttpInterceptor {
  
  constructor(private _authService: AuthService, private _loaderService: LoaderService, private _msjNotificationsService: MessageNotificationService) {}

  private listUrlWithoutToken: Array<string> = ['login', 'register', 'ipify', 'i18n']

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    this._loaderService.addPeticion(req);
    const authToken = this._authService.getAuthorizationToken;
    let request = req;
    
    if (this.listUrlWithoutToken.find((item)=> req.url.includes(item))) {
      return next.handle(request);
    }

    if(!authToken) {
      this._loaderService.deletePeticion();
      return throwError(() => null)
    } 

    if (authToken) {
      request = req.clone({
        headers: req.headers
          .set('Authorization', `Bearer ${authToken}`)
          .set('Content-Type', 'application/json')
          .set('Accept', 'application/json'),
      });
    }
    return next.handle(request);
  }
}