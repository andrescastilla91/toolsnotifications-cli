import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { GuardUsuarioLogueadoGuard } from '../helpers/guards/guard-usuario-logueado.guard';

const routes: Routes = [
  {path: '', component: HomeComponent, title: 'ToolsNotifications'},
  {
    path: 'auth',
    loadChildren: () => import('./autenticacion/autenticacion-routing.module').then((m) => m.AutenticacionRoutingModule)
  },
  {
    path: 'dashboard',
    canActivate: [GuardUsuarioLogueadoGuard],
    loadChildren: () => import('./dashboard/dashboard-routing.module').then((m) => m.DashboardRoutingModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ComponentsRoutingModule { }
