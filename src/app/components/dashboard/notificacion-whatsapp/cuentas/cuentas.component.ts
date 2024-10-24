import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { BtnFormularios, estadoBtnFormulario } from 'src/app/models/btn-formularios.models';
import { modelCuentaWhatsappApiRequest, modelCuentaWhatsappApiResponse, modelFormCuentaWhatsapp, modelLoginCuentaWhatsappApiRequest } from 'src/app/models/notificacion-whatsapp/model-cuenta-whatsapp.models';
import { AuthService } from 'src/app/services/autenticacion/auth.service';
import { CuentasWhatsappService } from 'src/app/services/notificacion-whatsapp/cuentas-whatsapp.service';
import { MessageNotificationService } from 'src/app/services/shared/notification.service';
import { ValidaFormularioService } from 'src/app/services/shared/valida-formulario.service';
import { PaisesService } from 'src/app/services/utilidades/paises.service';
import { Socket, io } from "socket.io-client";

@Component({
  selector: 'app-cuentas',
  templateUrl: './cuentas.component.html'
})
export class CuentasComponent implements OnDestroy, OnInit{

  private cancelSuscripcion: Array<Subscription> = [];
  protected _validaFormularioService:ValidaFormularioService = inject(ValidaFormularioService);
  protected _paisesService:PaisesService = inject(PaisesService);
  private _mensaje:MessageNotificationService = inject(MessageNotificationService);
  private _authService:AuthService = inject(AuthService);
  private _cuentasWhatsappService: CuentasWhatsappService = inject(CuentasWhatsappService);
  
  private fBuilder: FormBuilder = inject(FormBuilder);
  protected formCuentasWhatsapp: FormGroup<modelFormCuentaWhatsapp>;
  public get formControl() { return this.formCuentasWhatsapp.controls } ;
  protected btnFormulario:estadoBtnFormulario = new BtnFormularios().getBtnFormulario;
  
  protected listCuentasWhatsapp: Array<modelCuentaWhatsappApiResponse> = [];

  protected indicativoBase: string = '57';
  private urlLogo: string = '';

  //private socket: Socket;


  constructor(
  ){
    this.formCuentasWhatsapp = this.fBuilder.group({
      id: [''],
      usuario: ['', Validators.required],
      razon_social: ['', Validators.required],
      direccion: ['', Validators.required],
      logo: [''],
      estado: ['']
    });
    
    /*
    this.socket = io('wss://echo.websocket.org');
    this.socket.on('datosNuevos', (datos: any) => {
      console.log('Datos nuevos del webhook:', datos);
      // Aquí puedes manejar los datos recibidos en tu aplicación Angular
    });
    */
    
  }

  ngOnDestroy(): void {
    this.cancelSuscripcion.forEach((s) => s.unsubscribe());
  }

  ngOnInit(): void {
    this.getListarCuentasWhatsapp();
    this.onBtnCancelar();
  }

  protected onBtnNuevaCuenta(){
    this.btnFormulario.btnCrear.estado = false;
    this.btnFormulario.btnGuardar.estado = true;
    this.btnFormulario.btnCancelar.estado = true;
    this.formCuentasWhatsapp.reset();
  }

  protected onBtnCancelar(): void{
    this.formCuentasWhatsapp.reset();
    this.btnFormulario.btnCrear.estado = true;
    this.btnFormulario.btnCancelar.estado = false;
    this.btnFormulario.btnGuardar.estado = false;
  }

  protected onBtnInactivarCuenta(item:modelCuentaWhatsappApiResponse){
    this._mensaje.mensajeConfirmacion(`¿Estás seguro/a de que deseas inactivar tu cuenta? Esta acción desactivará tus notificaciones programadas. ¿Confirmas la inactivación de tu cuenta?`)
    .then((resp) => {
      if(resp.value){
        this.formCuentasWhatsapp.patchValue({
          id: item.id,
          razon_social: item.razon_social,
          direccion: item.direccion,
          usuario: item.usuario,
          estado: false
        });
        this.putRegistroCuentaWhatsapp();
      }
    })
  }

  protected onBtnActivarCuenta(item:modelCuentaWhatsappApiResponse){
    this._mensaje.mensajeConfirmacion(`¿Estás seguro/a de que deseas reactivar tu cuenta? Una vez reactivada, podrás usarla nuevamente en el portal de notificaciones y disfrutar de todos nuestros servicios. ¿Confirmas la reactivación de tu cuenta?`)
    .then((resp) => {
      if(resp.value){
        this.formCuentasWhatsapp.patchValue({
          id: item.id,
          razon_social: item.razon_social,
          direccion: item.direccion,
          usuario: item.usuario,
          estado: true
        });
        this.putRegistroCuentaWhatsapp();
      }
    })
  }

  private get getDataApi(): modelCuentaWhatsappApiRequest {
    return {
      ma_entidad_id: this._authService.getDataEntidad.id!.toString(),
      razon_social: this.formControl['razon_social'].value,
      direccion: this.formControl['direccion'].value,
      logo_url: this.urlLogo,
      usuario: this.indicativoBase + this.formControl['usuario'].value,
    }
  }

  private get getDataApiUpdate(): modelCuentaWhatsappApiRequest {
    return {
      ma_entidad_id: this._authService.getDataEntidad.id!.toString(),
      razon_social: this.formControl['razon_social'].value,
      direccion: this.formControl['direccion'].value,
      logo_url: this.urlLogo,
      estado: this.formControl['estado'].value
    }
  }

  private get getDataApiLogin(): modelLoginCuentaWhatsappApiRequest {
    return {
      usuario: this.indicativoBase + this.formControl['usuario'].value,
    }
  }

  /**Peticiones Api */
  private getListarCuentasWhatsapp():void{
    this.listCuentasWhatsapp = [];
    this.cancelSuscripcion.push(
      this._cuentasWhatsappService.getListarCuentasWhatsapp({ma_entidad_id: this._authService.getDataEntidad.id})
      .subscribe((resp) => {
        if(!resp.data.docs?.length) this._mensaje.mensajeAvisoImportante('¡Configura tus Notificaciones por WhatsApp! Parece que aún no tienes una cuenta asociada para generar tus notificaciones. Te guiaremos para crear una cuenta antes de proceder con la configuración. ¡Estamos aquí para ayudarte!');
        this.listCuentasWhatsapp = resp.data.docs!;
      })
    )
  }

  protected postRegistroCuentaWhatsapp(){
    this.formCuentasWhatsapp.markAllAsTouched();
    this.formCuentasWhatsapp.updateValueAndValidity();
    if(this.formCuentasWhatsapp.invalid) return this._mensaje.mensajeInfo(`Formulario incompleto. Valide información.`);
    this._cuentasWhatsappService.postRegistroCuentasWhatsapp(this.getDataApi)
    .subscribe((resp) => {
      this.postRegistroLoginCuentaWhatsapp();
    });
  }

  private postRegistroLoginCuentaWhatsapp(){
    this._cuentasWhatsappService.postRegistroLoginCuentasWhatsapp(this.getDataApiLogin)
    .subscribe((resp) => {
      this._mensaje.mensajeNotiLoginWhatsApp('¡Cuenta Creada con Éxito! Para activar tu cuenta, escanea el código QR con tu aplicación de WhatsApp.', resp)
      .then((resp)=>{
        this.onBtnCancelar();
        this._mensaje.mensajeAvisoImportante('¡Activación Exitosa! Tu cuenta ha sido activada con éxito. ¡Bienvenido/a a bordo para disfrutar de nuestras notificaciones!')
        .then((resp) => {
          this.getListarCuentasWhatsapp();
        })
      })
    })
  }

  protected putRegistroCuentaWhatsapp(){
    this.formCuentasWhatsapp.markAllAsTouched();
    this.formCuentasWhatsapp.updateValueAndValidity();
    if(this.formCuentasWhatsapp.invalid) return this._mensaje.mensajeInfo(`Formulario incompleto. Valide información.`);
    this._cuentasWhatsappService.putActualizaCuentasWhatsapp(this.getDataApiUpdate, this.formControl['id'].value)
    .subscribe((resp) => {
      this._mensaje.mensajeSuccess("Actualizacion realizada exitosamente.");
      this.onBtnCancelar();
      this.getListarCuentasWhatsapp();
    });
  }

}
