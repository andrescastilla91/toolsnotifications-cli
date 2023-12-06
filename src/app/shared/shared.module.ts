import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { LoaderComponent } from './componets/loader/loader.component';
import { MaterialModule } from './material/material.module';



@NgModule({
  declarations: [
    LoaderComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MaterialModule
  ],
  exports: [
    LoaderComponent,
    ReactiveFormsModule,
    MaterialModule
  ]
})
export class SharedModule { }
