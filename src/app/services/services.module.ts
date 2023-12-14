import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { AutenticacionService } from './autenticacion/autenticacion.service';
import { LoaderService } from './shared/loader.service';
import { TipoIdentificacionesService } from './utilidades/tipo-identificaciones.service';
import { DepartamentosService } from './utilidades/departamentos.service';
import { CiudadesService } from './utilidades/ciudades.service';
import { ValidaFormularioService } from './shared/valida-formulario.service';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers: [
    AutenticacionService,

    //Shared
    LoaderService,
    ValidaFormularioService,
    TipoIdentificacionesService,
    DepartamentosService,
    CiudadesService
  ]
})
export class ServicesModule { }
