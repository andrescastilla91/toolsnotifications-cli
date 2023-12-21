import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";
import { AuthService } from "src/app/services/autenticacion/auth.service";
import { MessageNotificationService } from "src/app/services/shared/notification.service";

export const GuardVerificacionCuentaGuard: CanActivateFn = () => {

  if (inject(AuthService).getAuthorizationToken && !inject(AuthService).getAccountVerification) {
    inject(MessageNotificationService).mensajeInfo('Tu cuenta aún necesita ser verificada. Por favor, revisa tu correo y completa la verificación para acceder. ¡Gracias por tu cooperación!');
    return true;
  }

  if (!inject(AuthService).getAuthorizationToken || !inject(AuthService).getAccountVerification) {
    inject(Router).navigate(['/']);
    return false;
  }

  if (inject(AuthService).getAccountVerification && inject(AuthService).getAuthorizationToken){
    inject(MessageNotificationService).mensajeSuccess("¡Bienvenido/a a ToolsNotifications! Tu espacio de control está listo. ¡A explorar y disfrutar!");
    inject(Router).navigate(['/dashboard']);
  }
  
  return false;

};
