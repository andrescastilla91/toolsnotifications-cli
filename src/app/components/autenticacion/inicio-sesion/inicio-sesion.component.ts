import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { modelFormInicioSesion, modelInicioSesionApiRequest, modelInicioSesionApiResponse } from 'src/app/models/autenticacion/model-inicio-sesion.models';
import { AutenticacionService } from 'src/app/services/autenticacion/autenticacion.service';
import { AuthService } from 'src/app/services/autenticacion/auth.service';
import { MessageNotificationService } from 'src/app/services/shared/notification.service';

@Component({
  selector: 'app-inicio-sesion',
  templateUrl: './inicio-sesion.component.html'
})
export class InicioSesionComponent implements OnDestroy {

  private cancelSuscripcion: Array<Subscription> = [];
  private fBuilder: FormBuilder = inject(FormBuilder);
  private router: Router = inject(Router);
  private _autenticacionService: AutenticacionService = inject(AutenticacionService);
  private _authService: AuthService = inject(AuthService);
  private _msjNotificationsService: MessageNotificationService = inject(MessageNotificationService);

  public formInicioSesion: FormGroup<modelFormInicioSesion>;
  public formControl = () => this.formInicioSesion.controls;
  public hideClave: boolean = true;

  constructor(){
    this.formInicioSesion = this.fBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      clave: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  ngOnDestroy(): void {
    this.cancelSuscripcion.forEach((s) => s.unsubscribe());
  }

  //SECCION GET
  private get getDataApi():modelInicioSesionApiRequest {
    return {
      email: this.formControl()['email'].value,
      password: this.formControl()['clave'].value
    }
  }

  //PETICIONES API
  public postInicioSesion(){
    console.log("aaa");
    
    this._autenticacionService.validaTools().subscribe((resp)=>{
      console.log(resp);
      
    });
    return
    this.formInicioSesion.markAllAsTouched();
    this.formInicioSesion.updateValueAndValidity();
    if(this.formInicioSesion.invalid) return this._msjNotificationsService.mensajeInfo("Valide información de formulario.");
    this.cancelSuscripcion.push(
      this._autenticacionService.postInicioSesion(this.getDataApi)
      .subscribe({
        next: (resp) => {
          this._msjNotificationsService.mensajeSuccess("¡Bienvenido de vuelta! Has iniciado sesión con éxito.")
          const data: modelInicioSesionApiResponse = {...resp, dataUser: {email: this.getDataApi.email}};
          this._authService.setAuthorizationToken(data);
          this.router.navigate(['/auth/verificacion']);
        },
        error: (err: HttpErrorResponse) => {
          if(err.status == 400) return this._msjNotificationsService.mensajeInfo("Credenciales Invalidas");
          this._msjNotificationsService.mensajeError("¡Ups! Parece que hubo un error al iniciar sesión. Inténtalo de nuevo. Si el problema persiste, estamos aquí para ayudarte. ¡Anímate, el siguiente intento será el bueno!");
        }
      })
    )
  }

}
