import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";
import { AuthService } from "src/app/services/autenticacion/auth.service";
import { MessageNotificationService } from "src/app/services/shared/notification.service";

export const GuardVerificacionEntidadGuard: CanActivateFn = () => {
  
  if (!inject(AuthService).getDataEntidad){
    inject(MessageNotificationService).mensajeInfo("hora de crear la entidad");
    inject(Router).navigate(['/dashboard']);
    return false
  }

  return true;
};