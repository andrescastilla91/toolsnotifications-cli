import { Component, OnInit, ViewChild, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { modelSidebarMenu } from 'src/app/models/shared/sidebar-dashboard.models';
import { AuthService } from 'src/app/services/autenticacion/auth.service';
import { MessageNotificationService } from 'src/app/services/shared/notification.service';
import { SidenavService } from 'src/app/services/shared/sidenav.servise';
import { ROUTES_MENU } from 'src/app/shared/componets/sidebar-dashboard/sidebar-conf';
import { ModalEntidadComponent } from './modals/modal-entidad/modal-entidad.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  @ViewChild('sidenavMenu') sidenav: MatSidenav | undefined;
  private router:Router = inject(Router);
  private modal: MatDialog = inject(MatDialog);
  private _sidenavService: SidenavService = inject(SidenavService);
  private _authService: AuthService = inject(AuthService);
  private _mensaje:MessageNotificationService = inject(MessageNotificationService);

  protected menuItems: Array<modelSidebarMenu> = ROUTES_MENU;

  ngOnInit(): void {
    this._sidenavService.isOpened$.subscribe((resp) => {
      resp? this.sidenav?.close() : this.sidenav?.open();
    });
    this.validaInfoEntidad();
  }

  private validaInfoEntidad(){
    if(!this._authService.getDataEntidad && this._authService.getAuthorizationToken) {
      this._mensaje.mensajeAvisoImportante("¡Bienvenido/a! Parece que aún no has registrado la información de tu negocio. Completa los detalles para disfrutar al máximo de nuestra plataforma. ¡Estamos aquí para ayudarte!")
      .then(()=> this.openModalEntidad());
      return;
    }
  }

  private openModalEntidad(){
    if(!this.modal.getDialogById('modal-entidad')){
      const dialogRef = this.modal.open(ModalEntidadComponent, {
        id: 'modal-entidad',
        disableClose: true,
        width: '70%'
      });
      dialogRef.afterClosed().subscribe((resp) => {
        this.validaInfoEntidad();
      })
    }
  }


}
