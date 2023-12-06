import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from 'src/app/services/autenticacion/auth.service';


export const GuardRedirigirDashboardGuard: CanActivateFn = () => {
  
  const sesion = inject(AuthService);
  const router = inject(Router);
  
  if (sesion.getAuthorizationToken && sesion.getAccountVerification) router.navigate(['/dashboard']);

  if (sesion.getAuthorizationToken && !sesion.getAccountVerification) {
    
    router.navigate(['/auth/verificacion']);
  } 

  return true;
};
