import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';

const routes: Routes = [
  {
    path: '', component: DashboardComponent, title: 'ToolsNotifications - Dashboard',
    children: [
      {
        path: 'administracion',
        loadChildren: () => import('./administrativo/administrativo-routing.module').then((m) => m.AdministrativoRoutingModule)
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
