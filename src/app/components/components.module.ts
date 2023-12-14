import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ComponentsRoutingModule } from './components-routing.module';
import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AutenticacionModule } from './autenticacion/autenticacion.module';
import { SharedModule } from '../shared/shared.module';
import { DashboardModule } from './dashboard/dashboard.module';


@NgModule({
  declarations: [
    HomeComponent,
    PageNotFoundComponent,
  ],
  imports: [
    CommonModule,
    ComponentsRoutingModule,
    AutenticacionModule,
    DashboardModule
  ]
})
export class ComponentsModule { }
