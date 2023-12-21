import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { AdministrativoModule } from './administrativo/administrativo.module';
import { ModalsModule } from './modals/modals.module';
import { NotificacionEmailRoutingModule } from './notificacion-email/notificacion-email-routing.module';
import { NotificacionWhatsappModule } from './notificacion-whatsapp/notificacion-whatsapp.module';


@NgModule({
  declarations: [
    DashboardComponent,
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    SharedModule,
    ModalsModule,
    AdministrativoModule,
    NotificacionEmailRoutingModule,
    NotificacionWhatsappModule
  ]
})
export class DashboardModule { }
