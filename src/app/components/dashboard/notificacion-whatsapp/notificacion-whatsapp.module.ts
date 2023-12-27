import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NotificacionWhatsappRoutingModule } from './notificacion-whatsapp-routing.module';
import { CuentasComponent } from './cuentas/cuentas.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ContactosWhatsappComponent } from './contactos-whatsapp/contactos-whatsapp.component';
import { MensajeDirectoWhatsappComponent } from './mensaje-directo-whatsapp/mensaje-directo-whatsapp.component';

@NgModule({
  declarations: [
    CuentasComponent,
    ContactosWhatsappComponent,
    MensajeDirectoWhatsappComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    NotificacionWhatsappRoutingModule,
  ]
})
export class NotificacionWhatsappModule { }
