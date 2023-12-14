import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { LoaderComponent } from './componets/loader/loader.component';
import { MaterialModule } from './material/material.module';
import { HeaderDashboardComponent } from './componets/header-dashboard/header-dashboard.component';
import { SidebarDashboardComponent } from './componets/sidebar-dashboard/sidebar-dashboard.component';
import { RouterModule } from '@angular/router';

import { HeaderModalsComponent } from './componets/header-modals/header-modals.component';
import { ValidacionFormularioComponent } from './componets/validacion-formulario/validacion-formulario.component';
@NgModule({
  declarations: [
    LoaderComponent,
    HeaderDashboardComponent,
    HeaderModalsComponent,
    SidebarDashboardComponent,
    ValidacionFormularioComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    MaterialModule
  ],
  exports: [
    LoaderComponent,
    HeaderDashboardComponent,
    HeaderModalsComponent,
    ValidacionFormularioComponent,
    SidebarDashboardComponent,
    ReactiveFormsModule,
    MaterialModule
  ]
})
export class SharedModule { }
