import { Component, OnInit, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { ModalEntidadComponent } from 'src/app/components/dashboard/modals/modal-entidad/modal-entidad.component';
import { modelUsuarioApiResponse } from 'src/app/models/autenticacion/model-usuario.models';
import { modelHeaderMenu, typePathHeaderMenu } from 'src/app/models/shared/header-dashboard.models';
import { AutenticacionService } from 'src/app/services/autenticacion/autenticacion.service';
import { AuthService } from 'src/app/services/autenticacion/auth.service';
import { SidenavService } from 'src/app/services/shared/sidenav.servise';

@Component({
  selector: 'app-header-dashboard',
  templateUrl: './header-dashboard.component.html',
  styleUrls: ['./header-dashboard.component.scss']
})
export class HeaderDashboardComponent implements OnInit {

  private cancelSuscripcion: Array<Subscription> = [];
  private _sidenavService: SidenavService = inject(SidenavService);
  private _authService: AuthService = inject(AuthService);
  private _autenticacionService: AutenticacionService = inject(AutenticacionService);
  private modal: MatDialog = inject(MatDialog);
  
  protected statusSidenav: boolean = false;

  protected dataUsuario: modelUsuarioApiResponse = {};

  ngOnInit() {
    this._sidenavService.isOpened$.subscribe((resp) => this.statusSidenav = resp);
    this.getConsultaPerfilUsuario();
  }

  public MENU_USUARIO: Array<modelHeaderMenu> = [
    {
      path: 'perfil', title: 'Perfil de Usuario', icon: 'bi bi-person-circle',
    },
    {
      path: 'entidad', title: 'Entidad', icon: 'bi bi-shop-window',
    },
    {
      path: 'facturacion', title: 'Facturación', icon: 'bi bi-receipt',
    },
    {
      path: 'descargas', title: 'Descargas', icon: 'bi bi-cloud-arrow-down',
    }
  ]

  protected onBtnOpenModal(path:typePathHeaderMenu){
    if(!this.modal.getDialogById('modal-opcion-header')){
      switch(path){
        case 'perfil':
          break;
        case 'entidad':
          this.modal.open(ModalEntidadComponent, {
            id: 'modal-opcion-header',
            disableClose: true,
            width: '70%'
          });
          break;
        case 'facturacion':
          break;
        case 'descargas':
          break;
      }
    }
  }

  protected onBtnStatusSidenav(){
    this.statusSidenav? this._sidenavService.close() : this._sidenavService.open();
  }

  protected get getLetraInicialUsuario():string{
    return this.dataUsuario.name?.substring(0, 1).toUpperCase()!;
  }

  protected signOut() {
    if(confirm("Esta seguro que desea cerrar sesión?")){
      this._authService.cerrarSesion();
    }
  }

  /**Peticiones Api */
  private getConsultaPerfilUsuario(){
    this.cancelSuscripcion.push(
      this._autenticacionService.getConsultaPerfilUsuario({email: this._authService.getEmailUser})
      .subscribe((resp)=>{
        this.dataUsuario = resp.data;
      })
    )
  }
}
