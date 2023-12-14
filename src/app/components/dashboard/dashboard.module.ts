import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { AdministrativoModule } from './administrativo/administrativo.module';
import { ModalsModule } from './modals/modals.module';


@NgModule({
  declarations: [
    DashboardComponent,
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    SharedModule,
    ModalsModule,
    AdministrativoModule
  ]
})
export class DashboardModule { }
