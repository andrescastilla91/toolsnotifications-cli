import { Component, OnDestroy, OnInit, ViewChild, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatCalendarCellClassFunction, MatCalendarCellCssClasses } from '@angular/material/datepicker';
import * as moment from 'moment';
import { Subscription } from 'rxjs';
import { BtnFormularios, estadoBtnFormulario } from 'src/app/models/btn-formularios.models';
import { modelContactosWhatsappApiResponse } from 'src/app/models/notificacion-whatsapp/model-contactos-whatsapp.models';
import { modelCuentaWhatsappApiResponse } from 'src/app/models/notificacion-whatsapp/model-cuenta-whatsapp.models';
import { modelFormMensajeProgramadoWhatsapp, modelMensajeProgramadoWhatsappApiRequest, modelMensajeProgramadoWhatsappApiResponse } from 'src/app/models/notificacion-whatsapp/model-mensaje-programado-whatsapp.models copy';
import { modelTipoMensajeWhatsappApiResponse } from 'src/app/models/notificacion-whatsapp/model-tipo-mensaje-whatsapp.models';
import { AuthService } from 'src/app/services/autenticacion/auth.service';
import { ContactosWhatsappService } from 'src/app/services/notificacion-whatsapp/contactos-whatsapp.service';
import { CuentasWhatsappService } from 'src/app/services/notificacion-whatsapp/cuentas-whatsapp.service';
import { MensajeProgramadoWhatsappService } from 'src/app/services/notificacion-whatsapp/mensaje-programado-whatsapp.service';
import { TipoMensajeWhatsappService } from 'src/app/services/notificacion-whatsapp/tipo-mensaje-whatsapp.service';
import { MessageNotificationService } from 'src/app/services/shared/notification.service';
import { ValidaFormularioService } from 'src/app/services/shared/valida-formulario.service';
import { EditorTextoComponent } from 'src/app/shared/componets/editor-texto/editor-texto.component';

@Component({
  selector: 'app-mensaje-programado-whatsapp',
  templateUrl: './mensaje-programado-whatsapp.component.html'
})
export class MensajeProgramadoWhatsappComponent implements OnDestroy, OnInit{

  @ViewChild(EditorTextoComponent) private _EditorTextoComponent: EditorTextoComponent = new EditorTextoComponent();

  private cancelSuscripcion: Array<Subscription> = [];
  protected _validaFormularioService:ValidaFormularioService = inject(ValidaFormularioService);
  private _mensaje:MessageNotificationService = inject(MessageNotificationService);
  private _authService:AuthService = inject(AuthService);
  private _contactosWhatsappService: ContactosWhatsappService = inject(ContactosWhatsappService);
  private _cuentasWhatsappService: CuentasWhatsappService = inject(CuentasWhatsappService);
  private _tipoMensajeWhatsappService: TipoMensajeWhatsappService = inject(TipoMensajeWhatsappService);
  private _mensajeProgramadoWhatsappService: MensajeProgramadoWhatsappService = inject(MensajeProgramadoWhatsappService);
  
  private fBuilder: FormBuilder = inject(FormBuilder);
  protected formMensajeProgramadoWhatsapp: FormGroup<modelFormMensajeProgramadoWhatsapp>;
  public get formControl() { return this.formMensajeProgramadoWhatsapp.controls } ;
  protected btnFormulario:estadoBtnFormulario = new BtnFormularios().getBtnFormulario;
  
  protected listMensajesProgramadosWhatsapp: Array<modelMensajeProgramadoWhatsappApiResponse> = [];
  protected listCuentasWhatsapp: Array<modelCuentaWhatsappApiResponse> = [];
  protected listTipoMensajeWhatsapp: Array<modelTipoMensajeWhatsappApiResponse> = [];
  protected listContactosWhatsapp: Array<modelContactosWhatsappApiResponse> = [];
  protected listTipoNotificacion: Array<string> = ['UNICA', 'RECURRENTE']

  protected fecha: Date | null = new Date();
  constructor(){
    this.formMensajeProgramadoWhatsapp = this.fBuilder.group({
      id: [''],
      nombre: ['', Validators.required],
      fecha_notificacion: ['', Validators.required],
      tipo_notificacion: ['', Validators.required],
      concurrencia_envio: ['', Validators.required],
      cuenta: ['', Validators.required],
      contactos_destino: ['', Validators.required],
      tipo_mensaje: ['', Validators.required],
      mensaje: ['', Validators.required]
    });
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
    });
    this.cancelSuscripcion.push(
      this.formControl['tipo_notificacion'].valueChanges.subscribe((resp)=>{
        if(resp && resp != 'UNICA'){
          this.formControl['concurrencia_envio'].enable();
          this.formControl['concurrencia_envio'].setValue("");
          this.formControl['concurrencia_envio'].setValidators([Validators.required, Validators.min(1)])
          this.formControl['concurrencia_envio'].updateValueAndValidity();
        }else{
          this.setClearInputConcurrencia();
        }
      }),
    )
    this.onBtnCancelar();
  }

  private setClearInputConcurrencia(){
    this.formControl['concurrencia_envio'].setValue("");
    this.formControl['concurrencia_envio'].disable();
    this.formControl['concurrencia_envio'].clearValidators();
    this.formControl['concurrencia_envio'].updateValueAndValidity();
  }

  private setDataMensajeProgramado(item:modelMensajeProgramadoWhatsappApiResponse){
    this.formMensajeProgramadoWhatsapp.patchValue({
      id: item.id,
      nombre: item.nombre,
      fecha_notificacion: moment(item.fechaNotificacion).toDate(),
      tipo_notificacion: item.tipoNotificacion,
      cuenta: item.whatsappCuenta,
      tipo_mensaje: item.whatsappTipoMensaje,
      contactos_destino: item.whatsappContactos,
    });
    setTimeout(()=>{
      this._EditorTextoComponent.setValueEditorTexto(item.bodyMessage)
    },0)
  }


  protected onBtnNuevaProgramacion(){
    this.btnFormulario.btnCrear.estado = false;
    this.btnFormulario.btnEditar.estado = false;
    this.btnFormulario.btnGuardar.estado = true;
    this.btnFormulario.btnCancelar.estado = true;
    this.formMensajeProgramadoWhatsapp.reset();
  }

  protected onBtnCancelar(): void{
    this.formMensajeProgramadoWhatsapp.reset();
    this.setClearInputConcurrencia();
    this.btnFormulario.btnCrear.estado = true;
    this.btnFormulario.btnEditar.estado = true;
    this.btnFormulario.btnCancelar.estado = false;
    this.btnFormulario.btnGuardar.estado = false;
    this.btnFormulario.btnActualizar.estado = false;
    this.getListarMensajesProgramadosWhatsapp();
  }

  protected onBtnEditar(item:modelMensajeProgramadoWhatsappApiResponse){
    this.formMensajeProgramadoWhatsapp.reset();
    this.btnFormulario.btnCrear.estado = false;
    this.btnFormulario.btnEditar.estado = false;
    this.btnFormulario.btnCancelar.estado = true;
    this.btnFormulario.btnActualizar.estado = true;
    this.setDataMensajeProgramado(item);
  }

  private get getDataApi(): modelMensajeProgramadoWhatsappApiRequest {
    return {
      ma_entidad_id: this._authService.getDataEntidad.id!.toString(),
      nombre: this.formControl['nombre'].value,
      fechaNotificacion: moment(this.formControl['fecha_notificacion'].value).format("YYYY-MM-DD"),
      tipoNotificacion: this.formControl['tipo_notificacion'].value,
      concurrenciaNotificacion: Number(this.formControl['concurrencia_envio'].value),
      whatsappCuenta: this.formControl['cuenta'].value,
      whatsappTipoMensaje: this.formControl['tipo_mensaje'].value,
      whatsappContactos: JSON.stringify(this.formControl['contactos_destino'].value),
      bodyMessage: this.formControl['mensaje'].value
    }
  }

  private get getDataApiUpdate(): modelMensajeProgramadoWhatsappApiRequest {
    return {
      ma_entidad_id: this._authService.getDataEntidad.id!.toString(),
      nombre: this.formControl['nombre'].value,
      fechaNotificacion: moment(this.formControl['fecha_notificacion'].value).format("YYYY-MM-DD"),
      tipoNotificacion: this.formControl['tipo_notificacion'].value,
      concurrenciaNotificacion: Number(this.formControl['concurrencia_envio'].value),
      whatsappCuenta: this.formControl['cuenta'].value,
      whatsappTipoMensaje: this.formControl['tipo_mensaje'].value,
      whatsappContactos: JSON.stringify(this.formControl['contactos_destino'].value),
      bodyMessage: this.formControl['mensaje'].value,
      estado: true
    }
  }

  /**Peticiones Api */
  private getListarMensajesProgramadosWhatsapp():void{
    this.listMensajesProgramadosWhatsapp = [];
    this.cancelSuscripcion.push(
      this._mensajeProgramadoWhatsappService.getListarMensajeProgramadoWhatsapp({ma_entidad_id: this._authService.getDataEntidad.id, estado: 'true'})
      .subscribe((resp) => {
        if(!resp.data.docs?.length) this._mensaje.mensajeAvisoImportante('¡Configura tus Notificaciones por WhatsApp! Parece que aún no tienes una cuenta asociada para generar tus notificaciones. Te guiaremos para crear una cuenta antes de proceder con la configuración. ¡Estamos aquí para ayudarte!');
        this.listMensajesProgramadosWhatsapp = resp.data.docs!;
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

  protected getListarContactosWhatsapp():void{
    this.listContactosWhatsapp = [];
    this.cancelSuscripcion.push(
      this._contactosWhatsappService.getListarContactosWhatsapp({ma_entidad_id: this._authService.getDataEntidad.id})
      .subscribe((resp) => {
        if(!resp.data.docs?.length) this._mensaje.mensajeAvisoImportante('¡Parece que tu libreta de contactos está vacía. ¡Agrega contactos para comenzar a enviar notificaciones!. ¡Estamos aquí para ayudarte!');
        this.listContactosWhatsapp = resp.data.docs!;
      })
    )
  }

  private getListarTipoMensajeWhatsapp(): void{
    this.listTipoMensajeWhatsapp = [];
    this.cancelSuscripcion.push(
      this._tipoMensajeWhatsappService.getListarTipoMensajeWhatsapp()
      .subscribe((resp) => {
        if(!resp.data.docs?.length) this._mensaje.mensajeAvisoImportante('¡Ups! Parece que hay un problema al mostrar los tipos de mensaje en este momento. Por favor, inténtalo de nuevo más tarde o ponte en contacto con soporte para obtener asistencia. Disculpa las molestias.');
        this.listTipoMensajeWhatsapp = resp.data.docs!;
      })
    )
  }

  protected postRegistroMensajeProgramadoWhatsapp(){
    this.formControl['mensaje'].setValue(this._EditorTextoComponent.getValueEditorTexto);
    this.formMensajeProgramadoWhatsapp.markAllAsTouched();
    this.formMensajeProgramadoWhatsapp.updateValueAndValidity();
    if(this.formMensajeProgramadoWhatsapp.invalid) return this._mensaje.mensajeInfo(`Formulario incompleto. Valide información.`);
    this.cancelSuscripcion.push(
      this._mensajeProgramadoWhatsappService.postRegistroMensajeProgramadoWhatsapp(this.getDataApi)
      .subscribe((resp)=>{
        this.onBtnCancelar();
        this._mensaje.mensajeSuccess('Mensaje programado exitosamente.');
      })
    )
  }

  protected putRegistroMensajeProgramadoWhatsapp(){
    this.formControl['mensaje'].setValue(this._EditorTextoComponent.getValueEditorTexto);
    this.formMensajeProgramadoWhatsapp.markAllAsTouched();
    this.formMensajeProgramadoWhatsapp.updateValueAndValidity();
    if(this.formMensajeProgramadoWhatsapp.invalid) return this._mensaje.mensajeInfo(`Formulario incompleto. Valide información.`);
    this.cancelSuscripcion.push(
      this._mensajeProgramadoWhatsappService.putRegistroMensajeProgramadoWhatsapp(this.getDataApiUpdate, this.formControl['id'].value)
      .subscribe((resp)=>{
        this.onBtnCancelar();
        this._mensaje.mensajeSuccess('Mensaje actualizado exitosamente.');
      })
    )
  }

}
