import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { AutenticacionService } from './autenticacion/autenticacion.service';
import { LoaderService } from './shared/loader.service';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers: [
    AutenticacionService,

    //Shared
    LoaderService
  ]
})
export class ServicesModule { }
