import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdministrativoRoutingModule } from './administrativo-routing.module';
import { EntidadComponent } from './entidad/entidad.component';


@NgModule({
  declarations: [
    EntidadComponent
  ],
  imports: [
    CommonModule,
    AdministrativoRoutingModule
  ]
})
export class AdministrativoModule { }
