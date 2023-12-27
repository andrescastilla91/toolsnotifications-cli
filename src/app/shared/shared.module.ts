import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoaderComponent } from './componets/loader/loader.component';
import { MaterialModule } from './material/material.module';
import { HeaderDashboardComponent } from './componets/header-dashboard/header-dashboard.component';
import { SidebarDashboardComponent } from './componets/sidebar-dashboard/sidebar-dashboard.component';
import { RouterModule } from '@angular/router';

import { HeaderModalsComponent } from './componets/header-modals/header-modals.component';
import { ValidacionFormularioComponent } from './componets/validacion-formulario/validacion-formulario.component';
import { EditorTextoComponent } from './componets/editor-texto/editor-texto.component';
import { QuillModule } from 'ngx-quill';
@NgModule({
  declarations: [
    LoaderComponent,
    HeaderDashboardComponent,
    HeaderModalsComponent,
    SidebarDashboardComponent,
    ValidacionFormularioComponent,
    EditorTextoComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    MaterialModule,
    QuillModule
  ],
  exports: [
    LoaderComponent,
    HeaderDashboardComponent,
    HeaderModalsComponent,
    ValidacionFormularioComponent,
    SidebarDashboardComponent,
    EditorTextoComponent,
    ReactiveFormsModule,
    FormsModule,
    MaterialModule,
    QuillModule
  ]
})
export class SharedModule { }
