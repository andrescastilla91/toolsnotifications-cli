import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';

const routes: Routes = [
  {
    path: '', component: DashboardComponent, title: 'ToolsNotifications - Dashboard',
    children: [
      {
        path: 'administracion',
        loadChildren: () => import('./administrativo/administrativo-routing.module').then((m) => m.AdministrativoRoutingModule)
      },
      {
        path: 'notificacion-email',
        loadChildren: () => import('./notificacion-email/notificacion-email-routing.module').then((m) => m.NotificacionEmailRoutingModule)
      },
      {
        path: 'notificacion-whatsapp',
        loadChildren: () => import('./notificacion-whatsapp/notificacion-whatsapp-routing.module').then((m) => m.NotificacionWhatsappRoutingModule)
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
