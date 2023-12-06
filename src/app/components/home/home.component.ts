import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  private router: Router = inject(Router);

  onBtnInicioSesion(){
    this.router.navigate(['/auth']);
  }

  onBtnRegistro(){
    this.router.navigate(['/auth/registro']);
  }
}
