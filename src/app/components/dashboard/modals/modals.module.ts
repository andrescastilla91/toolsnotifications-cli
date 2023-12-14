import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { SharedModule } from 'src/app/shared/shared.module';
import { ModalEntidadComponent } from './modal-entidad/modal-entidad.component';


@NgModule({
  declarations: [
    ModalEntidadComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
  ]
})
export class ModalsModule { }
