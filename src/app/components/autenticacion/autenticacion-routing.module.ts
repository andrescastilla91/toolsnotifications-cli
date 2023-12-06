import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioSesionComponent } from './inicio-sesion/inicio-sesion.component';
import { RegistrateComponent } from './registrate/registrate.component';
import { VerificacionCuentaComponent } from './verificacion-cuenta/verificacion-cuenta.component';
import { GuardVerificacionCuentaGuard } from 'src/app/helpers/guards/guard-verificacion-cuenta.guard';
import { GuardRedirigirDashboardGuard } from 'src/app/helpers/guards/guard-redirigir-dashboard.guard';

const routes: Routes = [
  {path: '', component: InicioSesionComponent, title: 'ToolsNotifications - Inicio de Sesión', canActivate: [GuardRedirigirDashboardGuard]},
  {path: 'registro', component: RegistrateComponent, title: 'ToolsNotifications - Registro de Usuario', canActivate: [GuardRedirigirDashboardGuard]},
  {path: 'verificacion', component: VerificacionCuentaComponent, canActivate: [GuardVerificacionCuentaGuard], title: 'ToolsNotifications - Verificación de Cuenta'}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AutenticacionRoutingModule { }
