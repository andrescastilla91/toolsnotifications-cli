import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CuentasComponent } from './cuentas/cuentas.component';
import { ContactosWhatsappComponent } from './contactos-whatsapp/contactos-whatsapp.component';
import { MensajeDirectoWhatsappComponent } from './mensaje-directo-whatsapp/mensaje-directo-whatsapp.component';
import { MensajeProgramadoWhatsappComponent } from './mensaje-programado-whatsapp/mensaje-programado-whatsapp.component';

const routes: Routes = [
  {path: 'cuentas', component: CuentasComponent},
  {path: 'contactos', component: ContactosWhatsappComponent},
  {path: 'envio', component: MensajeDirectoWhatsappComponent},
  {path: 'programados', component: MensajeProgramadoWhatsappComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NotificacionWhatsappRoutingModule { }
