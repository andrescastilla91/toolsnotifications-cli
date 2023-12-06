import { NgModule } from '@angular/core';
import { NoPreloading, RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';

const routes: Routes = [
  { 
    path: '', 
    loadChildren: () => import('./components/components-routing.module').then((m) => m.ComponentsRoutingModule)
  },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    useHash: true,
    preloadingStrategy: NoPreloading
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
