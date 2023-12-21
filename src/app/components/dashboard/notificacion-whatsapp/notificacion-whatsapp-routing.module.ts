import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CuentasComponent } from './cuentas/cuentas.component';
import { ContactosWhatsappComponent } from './contactos-whatsapp/contactos-whatsapp.component';

const routes: Routes = [
  {path: 'cuentas', component: CuentasComponent},
  {path: 'contactos', component: ContactosWhatsappComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NotificacionWhatsappRoutingModule { }
