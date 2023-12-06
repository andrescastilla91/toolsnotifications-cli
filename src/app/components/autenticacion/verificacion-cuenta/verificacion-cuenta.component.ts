import { Component, OnDestroy, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { modelFormVerificacionCuenta, modelVerificacionCuentaApiRequest } from 'src/app/models/autenticacion/model-verificacion-cuenta.models';
import { AutenticacionService } from 'src/app/services/autenticacion/autenticacion.service';
import { AuthService } from 'src/app/services/autenticacion/auth.service';
import { MessageNotificationService } from 'src/app/services/shared/notification.service';

@Component({
  selector: 'app-verificacion-cuenta',
  templateUrl: './verificacion-cuenta.component.html',
  styleUrls: ['./verificacion-cuenta.component.scss']
})
export class VerificacionCuentaComponent implements OnDestroy {

  private cancelSuscripcion: Array<Subscription> = [];
  private fBuilder: FormBuilder = inject(FormBuilder);
  private router: Router = inject(Router);
  private _autenticacionService: AutenticacionService = inject(AutenticacionService);
  private _authService: AuthService = inject(AuthService);
  private _msjNotificationsService: MessageNotificationService = inject(MessageNotificationService);

  public formVerificacionCuenta: FormGroup<modelFormVerificacionCuenta>;
  public formControl = () => this.formVerificacionCuenta.controls;

  public emailOculto: string = '';
  public dataTimpoReenvio = {time: 60, status: false};

  constructor(){
    this.formVerificacionCuenta = this.fBuilder.group({
      codigo: ['', [Validators.required, Validators.minLength(6)] ]
    });
    this.setEmailOculto();
  }

  ngOnDestroy(): void {
    this.cancelSuscripcion.forEach((s) => s.unsubscribe());
  }

  private setTimer(){
    const interval = setInterval(()=>{
      this.dataTimpoReenvio.status = true;
      this.dataTimpoReenvio.time = this.dataTimpoReenvio.time - 1;
      if(this.dataTimpoReenvio.time == 0){
        this.dataTimpoReenvio.status = false;
        this.dataTimpoReenvio.time = 60;
        clearInterval(interval);
      }
    }, 1000)
  }

  private setEmailOculto(){
    const mail:Array<string> = ['andres.castilla.casadiego','gmail.com']; //this._authService.getEmailUser.split("@");
    const userMail:Array<string> = mail[0].split("");
    const serverMail:Array<string> = mail[1].split("");
    let nuevo = userMail[0];
    for(let i=1; i<userMail.length; i++){
      if(i == (userMail.length - 1))
        {nuevo += userMail[i]}else{nuevo += '*';}
    }
    this.emailOculto = nuevo + '@'
    nuevo = serverMail[0];
    for(let i=1; i<serverMail.length; i++){
      if(i == (serverMail.length - 1)){nuevo += serverMail[i]}
        else{nuevo += '*';}
    }
    this.emailOculto += nuevo;
  }

  onBtnCerrarSesion(){
    this._authService.cerrarSesion()
  }



  //SECCION GET
  private get getDataApi(): modelVerificacionCuentaApiRequest {
    return {
      codigo_activacion: String(this.formControl()['codigo'].value)
    }
  }


  //SECCION PETICIONES API
  public postVerificacion(){
    this.formVerificacionCuenta.markAllAsTouched();
    this.formVerificacionCuenta.updateValueAndValidity();
    if(this.formVerificacionCuenta.invalid) return this._msjNotificationsService.mensajeInfo("Valide información de formulario.");
    this.cancelSuscripcion.push(
      this._autenticacionService.postVerificacionCuenta(this.getDataApi)
      .subscribe({
        next: (resp)=>{
          if(!resp.data) return this._msjNotificationsService.mensajeError("Parece que ha habido un problema con la verificación. Por favor, verifica nuevamente tu cuenta o ponte en contacto con soporte para obtener ayuda.");
          this._authService.setVerificacionCuenta(resp.data);
          this._msjNotificationsService.mensajeSuccess("¡Cuenta verificada con éxito! ¡Bienvenido/a a nuestra comunidad! 🎉");
          setTimeout(() => {this.router.navigate(['/dashboard'])}, 500);
        },
        error: (err) => {
          this._msjNotificationsService.mensajeError("Parece que ha habido un problema con la verificación. Por favor, verifica nuevamente tu cuenta o ponte en contacto con soporte para obtener ayuda.");
        }
      })
    )
  }

  public postReenviarCodigoVerificacion(){
    this.cancelSuscripcion.push(
      this._autenticacionService.postReenvioCodigoVerificacionCuenta()
      .subscribe({
        next: () => {
          this.setTimer();
          this._msjNotificationsService.mensajeSuccess("Codigo de verificación enviado exitosamente al correo informado.");
        }
      })
    )
  }

}
