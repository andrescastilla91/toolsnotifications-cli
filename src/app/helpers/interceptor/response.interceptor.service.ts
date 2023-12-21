import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { LoaderService } from "../../services/shared/loader.service";
import { catchError, map, throwError } from "rxjs";
import { environment } from "src/environments/environment";
import { MessageNotificationService } from "../../services/shared/notification.service";
import { AuthService } from "src/app/services/autenticacion/auth.service";
import { MatDialog } from "@angular/material/dialog";

@Injectable()
export class ResponseInterceptor implements HttpInterceptor{

  constructor(
    private _loaderService: LoaderService,
    private _msjNotificationsService: MessageNotificationService,
    private _authService: AuthService,
    private modal: MatDialog
  ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    return next.handle(req).pipe(
      map((respuesta: HttpEvent<any> | any) => {
        if(respuesta instanceof HttpResponse){
          this._loaderService.deletePeticion();
        }
        return respuesta;
      }),
      catchError((error: HttpErrorResponse) => {
        this._loaderService.deletePeticion();
        const CAPTURA_ERRORES: any = {
          0: 'Problemas con la conexión al servidor, debe comunicarse con soporte tecnico.',
          401: 'No estas autorizado para realizar esta acción.',
          403: 'Tus credenciales son invalidas o no tienes permisos para la solicitud realizada.',
          422: JSON.stringify(error.error.erros),
          404: 'El contenido que solicitas no se encuentra disponible.',
          409: 'El registro ya se encuentra creado.',
          500: 'La solicitud al servidor, no pudo ser completada.',
          503: 'Servicio no disponible',
        };
        const ERROR_MSJ = CAPTURA_ERRORES[error.status] || 'Solicitud compleja, comunicarse con el soporte tecnico';
        this._msjNotificationsService.mensajeError(ERROR_MSJ);
        !environment.production ? console.log(error) : false;
        if(error.status == 401) {
          this._msjNotificationsService.mensajeInfo("¡Oops! Parece que tu sesión ha expirado. Por favor, vuelve a iniciar sesión para continuar disfrutando de nuestras notificaciones.");
          this._authService.cerrarSesion();
          this.modal.closeAll();
        } 
        return throwError(() => error );
      })
    )
  }
}