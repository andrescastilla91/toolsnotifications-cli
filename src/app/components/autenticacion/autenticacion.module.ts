import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AutenticacionRoutingModule } from './autenticacion-routing.module';
import { InicioSesionComponent } from './inicio-sesion/inicio-sesion.component';
import { RegistrateComponent } from './registrate/registrate.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { VerificacionCuentaComponent } from './verificacion-cuenta/verificacion-cuenta.component';


@NgModule({
  declarations: [
    InicioSesionComponent,
    RegistrateComponent,
    VerificacionCuentaComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    AutenticacionRoutingModule
  ]
})
export class AutenticacionModule { }
