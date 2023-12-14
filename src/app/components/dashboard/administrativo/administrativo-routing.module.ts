import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EntidadComponent } from './entidad/entidad.component';

const routes: Routes = [
  {path: 'entidad', component: EntidadComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdministrativoRoutingModule { }
