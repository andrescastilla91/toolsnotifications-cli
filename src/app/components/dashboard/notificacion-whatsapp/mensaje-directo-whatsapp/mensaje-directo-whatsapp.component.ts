import { Component, OnDestroy, OnInit, ViewChild, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { BtnFormularios, estadoBtnFormulario } from 'src/app/models/btn-formularios.models';
import { modelContactosWhatsappApiResponse } from 'src/app/models/notificacion-whatsapp/model-contactos-whatsapp.models';
import { modelCuentaWhatsappApiResponse } from 'src/app/models/notificacion-whatsapp/model-cuenta-whatsapp.models';
import { modelFormMensajeDirectoWhatsapp, modelMensajeDirectoWhatsappApiRequest } from 'src/app/models/notificacion-whatsapp/model-mensaje-whatsapp.models';
import { modelTipoMensajeWhatsappApiResponse } from 'src/app/models/notificacion-whatsapp/model-tipo-mensaje-whatsapp.models';
import { AuthService } from 'src/app/services/autenticacion/auth.service';
import { ContactosWhatsappService } from 'src/app/services/notificacion-whatsapp/contactos-whatsapp.service';
import { CuentasWhatsappService } from 'src/app/services/notificacion-whatsapp/cuentas-whatsapp.service';
import { MensajeDirectoWhatsappService } from 'src/app/services/notificacion-whatsapp/mensaje-directo-whatsapp.service';
import { TipoMensajeWhatsappService } from 'src/app/services/notificacion-whatsapp/tipo-mensaje-whatsapp.service';
import { MessageNotificationService } from 'src/app/services/shared/notification.service';
import { ValidaFormularioService } from 'src/app/services/shared/valida-formulario.service';
import { EditorTextoComponent } from 'src/app/shared/componets/editor-texto/editor-texto.component';

@Component({
  selector: 'app-mensaje-directo-whatsapp',
  templateUrl: './mensaje-directo-whatsapp.component.html'
})
export class MensajeDirectoWhatsappComponent implements OnDestroy, OnInit{

  @ViewChild(EditorTextoComponent) private _EditorTextoComponent: EditorTextoComponent = new EditorTextoComponent();

  private cancelSuscripcion: Array<Subscription> = [];
  protected _validaFormularioService:ValidaFormularioService = inject(ValidaFormularioService);
  private _mensaje:MessageNotificationService = inject(MessageNotificationService);
  private _authService:AuthService = inject(AuthService);
  private _tipoMensajeWhatsappService: TipoMensajeWhatsappService = inject(TipoMensajeWhatsappService);
  private _mensajeDirectoWhatsappService: MensajeDirectoWhatsappService = inject(MensajeDirectoWhatsappService);
  private _contactosWhatsappService: ContactosWhatsappService = inject(ContactosWhatsappService);
  private _cuentasWhatsappService: CuentasWhatsappService = inject(CuentasWhatsappService);
  
  private fBuilder: FormBuilder = inject(FormBuilder);
  protected formMensajeDirectoWhatsapp: FormGroup<modelFormMensajeDirectoWhatsapp>;
  public get formControl() { return this.formMensajeDirectoWhatsapp.controls } ;
  protected btnFormulario:estadoBtnFormulario = new BtnFormularios().getBtnFormulario;
  
  protected listCuentasWhatsapp: Array<modelCuentaWhatsappApiResponse> = [];
  protected listTipoMensajeWhatsapp: Array<modelTipoMensajeWhatsappApiResponse> = [];
  protected listContactosWhatsapp: Array<modelContactosWhatsappApiResponse> = [];

  protected indicativoBase: string = '57';

  constructor(
  ){
    this.formMensajeDirectoWhatsapp = this.fBuilder.group({
      cuenta: ['', Validators.required],
      numero_destino: ['', Validators.required],
      tipo_mensaje: ['', Validators.required],
      mensaje: ['', Validators.required]
    })
  }

  ngOnDestroy(): void {
    this.cancelSuscripcion.forEach((s) => s.unsubscribe());
  }

  ngOnInit(): void {
    this._mensaje.mensajeAvisoImportante('¡Antes de enviar mensajes, asegúrate de tener una cuenta configurada y contactos agregados en tu libreta! Completa estos pasos para comenzar a enviar notificaciones.')
    .then(() => {
      this.getListarTipoMensajeWhatsapp();
      this.getListarContactosWhatsapp();
      this.getListarCuentasWhatsapp();
    })
    this.onBtnCancelar();
  }

  protected onBtnCancelar(): void{
    this.formMensajeDirectoWhatsapp.reset();
    this._EditorTextoComponent.clearEditorTexto();
    this.btnFormulario.btnGuardar.estado = true;
    this.btnFormulario.btnCancelar.estado = true;
  }

  private get getDataApi(): modelMensajeDirectoWhatsappApiRequest {
    return {
      usuario: this.formControl['cuenta'].value,
      number: this.formControl['numero_destino'].value,
      tipo_mensaje: this.formControl['tipo_mensaje'].value,
      message: this.formControl['mensaje'].value
    }
  }

  /**Peticiones Api */
  private getListarTipoMensajeWhatsapp():void{
    this.listTipoMensajeWhatsapp = [];
    this.cancelSuscripcion.push(
      this._tipoMensajeWhatsappService.getListarTipoMensajeWhatsapp()
      .subscribe((resp) => {
        if(!resp.data.docs?.length) this._mensaje.mensajeAvisoImportante('¡Ups! Parece que hay un problema al mostrar los tipos de mensaje en este momento. Por favor, inténtalo de nuevo más tarde o ponte en contacto con soporte para obtener asistencia. Disculpa las molestias.');
        this.listTipoMensajeWhatsapp = resp.data.docs!;
      })
    )
  }

  private getListarCuentasWhatsapp():void{
    this.listCuentasWhatsapp = [];
    this.cancelSuscripcion.push(
      this._cuentasWhatsappService.getListarCuentasWhatsapp({ma_entidad_id: this._authService.getDataEntidad.id, estado: 'true'})
      .subscribe((resp) => {
        if(!resp.data.docs?.length) this._mensaje.mensajeAvisoImportante('¡Configura tus Notificaciones por WhatsApp! Parece que aún no tienes una cuenta asociada para generar tus notificaciones. Te guiaremos para crear una cuenta antes de proceder con la configuración. ¡Estamos aquí para ayudarte!');
        this.listCuentasWhatsapp = resp.data.docs!;
      })
    )
  }

  private getListarContactosWhatsapp():void{
    this.listContactosWhatsapp = [];
    this.cancelSuscripcion.push(
      this._contactosWhatsappService.getListarContactosWhatsapp({ma_entidad_id: this._authService.getDataEntidad.id, estado: 'true'})
      .subscribe((resp) => {
        if(!resp.data.docs?.length) this._mensaje.mensajeAvisoImportante('¡Parece que tu libreta de contactos está vacía. ¡Agrega contactos para comenzar a enviar notificaciones!. ¡Estamos aquí para ayudarte!');
        this.listContactosWhatsapp = resp.data.docs!;
        this.btnFormulario.btnEditar.estado = true;
      })
    )
  }

  protected postRegistroMensajeDirectoWhatsapp(){
    this.formControl['mensaje'].setValue(this._EditorTextoComponent.getValueEditorTexto);
    this.formMensajeDirectoWhatsapp.markAllAsTouched();
    this.formMensajeDirectoWhatsapp.updateValueAndValidity();
    if(this.formMensajeDirectoWhatsapp.invalid) return this._mensaje.mensajeInfo(`Formulario incompleto. Valide información.`);
    this.cancelSuscripcion.push(
      this._mensajeDirectoWhatsappService.postRegistroMensajeDirectoWhatsapp(this.getDataApi)
      .subscribe((resp) => {
        this._mensaje.mensajeSuccess('Mensaje enviado exitosamente.');
        this.onBtnCancelar();
      })
    )
  }

}

