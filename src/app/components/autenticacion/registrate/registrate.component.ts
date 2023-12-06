import { Component, OnDestroy, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { modelInicioSesionApiResponse } from 'src/app/models/autenticacion/model-inicio-sesion.models';
import { modelFormRegistroUsuario, modelRegistroUsuarioApiRequest } from 'src/app/models/autenticacion/model-registro-usuario.models';
import { AutenticacionService } from 'src/app/services/autenticacion/autenticacion.service';
import { AuthService } from 'src/app/services/autenticacion/auth.service';
import { MessageNotificationService } from 'src/app/services/shared/notification.service';

@Component({
  selector: 'app-registrate',
  templateUrl: './registrate.component.html'
})
export class RegistrateComponent implements OnDestroy {

  private cancelSuscripcion: Array<Subscription> = [];
  private fBuilder: FormBuilder = inject(FormBuilder);
  private router: Router = inject(Router);
  private _autenticacionService: AutenticacionService = inject(AutenticacionService);
  private _authService: AuthService = inject(AuthService);
  private _msjNotificationsService: MessageNotificationService = inject(MessageNotificationService);

  public formRegistroUsuario: FormGroup<modelFormRegistroUsuario>;
  public formControl = () => this.formRegistroUsuario.controls;
  public hideClave: boolean = true;

  constructor(){
    this.formRegistroUsuario = this.fBuilder.group({
      nombre: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      clave: ['', [Validators.required, Validators.minLength(8)]],
      confirma_clave: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  ngOnDestroy(): void {
    this.cancelSuscripcion.forEach((s) => s.unsubscribe());
  }

  //SECCION GET
  private get getDataApi():modelRegistroUsuarioApiRequest {
    return {
      name: this.formControl()['nombre'].value,
      email: this.formControl()['email'].value,
      password: this.formControl()['clave'].value,
      password_confirmation: this.formControl()['confirma_clave'].value
    }
  }

  //SECCION PETICIONES API
  postRegistroUsuario(){
    this.formRegistroUsuario.markAllAsTouched();
    this.formRegistroUsuario.updateValueAndValidity();
    if(this.formRegistroUsuario.invalid) return this._msjNotificationsService.mensajeInfo("Valide información de formulario.");
    this.cancelSuscripcion.push(
      this._autenticacionService.postRegistroUsuario(this.getDataApi)
      .subscribe({
        next: (resp) => {
          this._msjNotificationsService.mensajeSuccess("¡Registro exitoso! Revisa tu correo para completar la verificación. ¡Gracias por unirte!");
          this.postInicioSesion();
        }
      })
    )
  }

  postInicioSesion(){
    this.cancelSuscripcion.push(
      this._autenticacionService.postInicioSesion(this.getDataApi)
      .subscribe({
        next: (resp) => {
          const data: modelInicioSesionApiResponse = {...resp, dataUser: {email: this.getDataApi.email}};
          this._authService.setAuthorizationToken(data);
          this.router.navigate(['/auth/verificacion']);
        },
        error: (err) => {
          this._msjNotificationsService.mensajeError("¡Ups! Parece que hubo un error al iniciar sesión. Inténtalo de nuevo. Si el problema persiste, estamos aquí para ayudarte. ¡Anímate, el siguiente intento será el bueno!");
          this.router.navigate(['/auth']);
        }
      })
    )
  }
  
}
