import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from 'src/app/services/autenticacion/auth.service';

export const GuardUsuarioLogueadoGuard: CanActivateFn = () => {

  if (!inject(AuthService).getAuthorizationToken || !inject(AuthService).getAccountVerification) {
    inject(Router).navigate(['/']);
    return false;
  }

  if (inject(AuthService).getAuthorizationToken && !inject(AuthService).getAccountVerification) {
    inject(Router).navigate(['/auth/verificacion']);
    return false;
  }

  return true;
};
