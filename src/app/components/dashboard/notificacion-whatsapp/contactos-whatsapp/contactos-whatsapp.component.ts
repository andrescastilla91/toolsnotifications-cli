import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { BtnFormularios, estadoBtnFormulario } from 'src/app/models/btn-formularios.models';
import { modelContactosWhatsappApiRequest, modelContactosWhatsappApiResponse, modelFormContactosWhatsapp } from 'src/app/models/notificacion-whatsapp/model-contactos-whatsapp.models';
import { AuthService } from 'src/app/services/autenticacion/auth.service';
import { ContactosWhatsappService } from 'src/app/services/notificacion-whatsapp/contactos-whatsapp.service';
import { MessageNotificationService } from 'src/app/services/shared/notification.service';
import { ValidaFormularioService } from 'src/app/services/shared/valida-formulario.service';
import { PaisesService } from 'src/app/services/utilidades/paises.service';

@Component({
  selector: 'app-contactos-whatsapp',
  templateUrl: './contactos-whatsapp.component.html'
})
export class ContactosWhatsappComponent implements OnDestroy, OnInit{

  private cancelSuscripcion: Array<Subscription> = [];
  protected _validaFormularioService:ValidaFormularioService = inject(ValidaFormularioService);
  protected _paisesService:PaisesService = inject(PaisesService);
  private _mensaje:MessageNotificationService = inject(MessageNotificationService);
  private _authService:AuthService = inject(AuthService);
  private _contactosWhatsappService: ContactosWhatsappService = inject(ContactosWhatsappService);
  
  private fBuilder: FormBuilder = inject(FormBuilder);
  protected formContactosWhatsapp: FormGroup<modelFormContactosWhatsapp>;
  public get formControl() { return this.formContactosWhatsapp.controls } ;
  protected btnFormulario:estadoBtnFormulario = new BtnFormularios().getBtnFormulario;

  protected listContactosWhatsapp: Array<modelContactosWhatsappApiResponse> = [];
  protected indicativoBase: string = '57';

  constructor(){
    this.formContactosWhatsapp = this.fBuilder.group({
      id: [''],
      numero_telefonico: ['', Validators.required],
      nombre_contacto: ['', Validators.required],
      estado: ['']
    })
  }

  ngOnDestroy(): void {
    this.cancelSuscripcion.forEach((s) => s.unsubscribe());
  }

  ngOnInit(): void {
    this.onBtnCancelar();
  }

  protected onBtnNuevaContacto(){
    this.btnFormulario.btnCrear.estado = false;
    this.btnFormulario.btnGuardar.estado = true;
    this.btnFormulario.btnCancelar.estado = true;
    this.formContactosWhatsapp.reset();
  }

  protected onBtnCancelar(): void{
    this.formContactosWhatsapp.reset();
    this.btnFormulario.btnCrear.estado = true;
    this.btnFormulario.btnCancelar.estado = false;
    this.btnFormulario.btnGuardar.estado = false;
    this.btnFormulario.btnActualizar.estado = false;
    this.getListarContactosWhatsapp();
  }

  protected onBtnEditar(data:modelContactosWhatsappApiResponse){
    this.formContactosWhatsapp.reset();
    this.btnFormulario.btnActualizar.estado = true;
    this.btnFormulario.btnCancelar.estado = true;
    this.btnFormulario.btnCrear.estado = false;
    this.btnFormulario.btnGuardar.estado = false;
    this.setDataContacto(data);
  }

  private setDataContacto(data:modelContactosWhatsappApiResponse){
    this.indicativoBase = data.numero.substring(0,2);
    this.formContactosWhatsapp.patchValue({
      id: data.id,
      nombre_contacto: data.nombre,
      numero_telefonico: data.numero.substring(2, (data.numero.length)),
      estado: data.estado
    });
  }

  private get getDataApi(): modelContactosWhatsappApiRequest {
    return {
      ma_entidad_id: this._authService.getDataEntidad.id!.toString(),
      numero: this.indicativoBase + this.formControl['numero_telefonico'].value,
      nombre: this.formControl['nombre_contacto'].value,
    }
  }

  private get getDataApiUpdate(): modelContactosWhatsappApiRequest {
    return {
      numero: this.indicativoBase + this.formControl['numero_telefonico'].value,
      nombre: this.formControl['nombre_contacto'].value,
      estado: Boolean(this.formControl['estado'].value)
    }
  }

  /**Peticiones Api */
  private getListarContactosWhatsapp():void{
    this.listContactosWhatsapp = [];
    this.cancelSuscripcion.push(
      this._contactosWhatsappService.getListarContactosWhatsapp({ma_entidad_id: this._authService.getDataEntidad.id})
      .subscribe((resp) => {
        if(!resp.data.docs?.length) this._mensaje.mensajeAvisoImportante('¡Parece que tu libreta de contactos está vacía. ¡Agrega contactos para comenzar a enviar notificaciones!. ¡Estamos aquí para ayudarte!');
        this.listContactosWhatsapp = resp.data.docs!;
        this.btnFormulario.btnEditar.estado = true;
      })
    )
  }

  protected postRegistroContactosWhatsapp(){
    this.formContactosWhatsapp.markAllAsTouched();
    this.formContactosWhatsapp.updateValueAndValidity();
    if(this.formContactosWhatsapp.invalid) return this._mensaje.mensajeInfo(`Formulario incompleto. Valide información.`);
    this._contactosWhatsappService.postRegistroContactosWhatsapp(this.getDataApi)
    .subscribe((resp) => {
      this._mensaje.mensajeSuccess('¡Primer Contacto Creado! ¡Bienvenido/a a tu libreta de contactos! Agrega más contactos para expandir tu red de notificaciones.');
      this.onBtnCancelar();
    });
  }

  protected putRegistroContactosWhatsapp(){
    this.formContactosWhatsapp.markAllAsTouched();
    this.formContactosWhatsapp.updateValueAndValidity();
    if(this.formContactosWhatsapp.invalid) return this._mensaje.mensajeInfo(`Formulario incompleto. Valide información.`);
    this._contactosWhatsappService.putActualizaContactosWhatsapp(this.getDataApiUpdate, this.formControl['id'].value)
    .subscribe((resp) => {
      this._mensaje.mensajeSuccess('¡Datos Actualizados! Los detalles del contacto se han actualizado correctamente.');
      this.onBtnCancelar();
    });
  }

  
}
