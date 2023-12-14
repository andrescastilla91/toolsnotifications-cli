import { AfterViewInit, Component, OnDestroy, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { modelEntidadesApiRequest, modelFormEntidad } from 'src/app/models/administracion/model-entidad.models';
import { BtnFormularios, estadoBtnFormulario } from 'src/app/models/btn-formularios.models';
import { modelCiudadesApiResponse } from 'src/app/models/utilidad/ciudades.models';
import { modelDepartamentosApiResponse } from 'src/app/models/utilidad/departamentos.models';
import { modelTipoIdentificacionApiResponse } from 'src/app/models/utilidad/tipo-identificaciones.models';
import { EntidadService } from 'src/app/services/administracion/entidad.service';
import { AuthService } from 'src/app/services/autenticacion/auth.service';
import { MessageNotificationService } from 'src/app/services/shared/notification.service';
import { ValidaFormularioService } from 'src/app/services/shared/valida-formulario.service';
import { CiudadesService } from 'src/app/services/utilidades/ciudades.service';
import { DepartamentosService } from 'src/app/services/utilidades/departamentos.service';
import { TipoIdentificacionesService } from 'src/app/services/utilidades/tipo-identificaciones.service';

@Component({
  selector: 'app-modal-entidad',
  templateUrl: './modal-entidad.component.html'
})
export class ModalEntidadComponent implements OnDestroy, AfterViewInit {

  private cancelSuscripcion: Array<Subscription> = [];
  private fBuilder: FormBuilder = inject(FormBuilder);
  protected _validaFormularioService:ValidaFormularioService = inject(ValidaFormularioService);
  private _mensaje:MessageNotificationService = inject(MessageNotificationService);
  private _authService:AuthService = inject(AuthService);
  private _tipoIdentificacionService:TipoIdentificacionesService = inject(TipoIdentificacionesService);
  private _departamentosService:DepartamentosService = inject(DepartamentosService);
  private _ciudadesService:CiudadesService = inject(CiudadesService);
  private _entidadService:EntidadService = inject(EntidadService);

  protected btnFormulario:estadoBtnFormulario = new BtnFormularios().getBtnFormulario;

  public formEntidad: FormGroup<modelFormEntidad>;
  public get formControl() { return this.formEntidad.controls } ;

  public listTipoIdentificacion: {listado: Array<modelTipoIdentificacionApiResponse>, filtrado: Array<modelTipoIdentificacionApiResponse>} = { listado: [], filtrado: []};
  public listDepartamentos: {listado: Array<modelDepartamentosApiResponse>, filtrado: Array<modelDepartamentosApiResponse>} = { listado: [], filtrado: []}
  public listCiudades: {listado: Array<modelCiudadesApiResponse>, filtrado: Array<modelCiudadesApiResponse>} = { listado: [], filtrado: []}

  constructor(
    public dialogRef: MatDialogRef<ModalEntidadComponent>,
  ){ 
    this.formEntidad = this.fBuilder.group({
      id: [''],
      tipo_identificacion: ['', Validators.required],
      identificacion: ['', Validators.required],
      razon_social: ['', Validators.required],
      direccion: ['', Validators.required],
      departamento: ['', Validators.required],
      ciudad: ['', Validators.required],
      telefonos: ['', Validators.required],
      descripcion: ['', Validators.required],
      estado: ['']
    })
  }

  ngOnDestroy(): void {
    this.cancelSuscripcion.forEach((s) => s.unsubscribe());
  }

  ngAfterViewInit(): void {
    this.cancelSuscripcion.push(
      this.formControl['departamento'].valueChanges.subscribe((resp) => {
        if(resp) this.getListCiudades();
      })
    );
    setTimeout(() => {
      this.getListTipoIdentificacion();
      this.getListDepartamentos();
      this.setDataEntidad();
      this.btnFormulario.btnCancelar.estado = true;
    }, 0);
  }

  protected onBtnCancelar(): void{
    this.formEntidad.reset();
    this.dialogRef.close();
  }

  private setDataEntidad(){
    if(this._authService.getDataEntidad){
      this.formEntidad.patchValue({
        id: this._authService.getDataEntidad.id,
        tipo_identificacion: this._authService.getDataEntidad.utilidad_tipo_identificacion_id,
        identificacion: this._authService.getDataEntidad.identificacion,
        razon_social: this._authService.getDataEntidad.razon_social,
        direccion: this._authService.getDataEntidad.direccion,
        departamento: this._authService.getDataEntidad.utilidad_departamento_id,
        ciudad: this._authService.getDataEntidad.utilidad_ciudad_id,
        telefonos: this._authService.getDataEntidad.telefonos,
        descripcion: this._authService.getDataEntidad.descripcion,
        estado: this._authService.getDataEntidad.estado == 'activo'? true : false
      })
      this.btnFormulario.btnActualizar.estado = true;
    }else{
      this.btnFormulario.btnGuardar.estado = true;
    }
  }

  private get getDataApi(): modelEntidadesApiRequest{
    return {
      id: this.formControl['id'].value,
      utilidad_tipo_identificacion_id: this.formControl['tipo_identificacion'].value,
      identificacion: this.formControl['identificacion'].value,
      razon_social: this.formControl['razon_social'].value,
      direccion: this.formControl['direccion'].value,
      utilidad_departamento_id: this.formControl['departamento'].value,
      utilidad_ciudad_id: this.formControl['ciudad'].value,
      telefonos: this.formControl['telefonos'].value,
      descripcion: this.formControl['descripcion'].value,
      estado: this.formControl['estado'].value? 'activo' : 'inactivo'
    }
  }

  //Petiticones API
  private getListTipoIdentificacion(): void{
    this.cancelSuscripcion.push(
      this._tipoIdentificacionService.getListadoTipoIdentificacion()
      .subscribe((resp)=>{
        this.listTipoIdentificacion = {
          listado: resp.data,
          filtrado: resp.data
        } 
      })
    )
  }

  private getListDepartamentos(): void{
    this.cancelSuscripcion.push(
      this._departamentosService.getListadoDepartamentos()
      .subscribe((resp)=> this.listDepartamentos = {
         listado: resp.data,
         filtrado: resp.data
      })
    )      
  }

  private getListCiudades(): void{
    this.cancelSuscripcion.push(
      this._ciudadesService.getListadoCiudades({departamento_id: this.formControl['departamento'].value})
      .subscribe((resp)=> this.listCiudades = {
        listado: resp.data,
        filtrado: resp.data
      } )
    )    
  }

  protected postRegistroEntidad(): void{
    this.formEntidad.markAllAsTouched();
    this.formEntidad.updateValueAndValidity();
    if(this.formEntidad.invalid) return this._mensaje.mensajeInfo(`Formulario incompleto. Valide información.`);
    this.cancelSuscripcion.push(
      this._entidadService.postRegistroEntidad(this.getDataApi)
      .subscribe((resp)=>{
        this._authService.setDataEntidad(resp.data);
        this._mensaje.mensajeSuccess(`La información de tu negocio ha sido ingresada exitosamente.`);
        this.onBtnCancelar();
      })
    )
  }

  protected putRegistroEntidad(): void{
    this.formEntidad.markAllAsTouched();
    this.formEntidad.updateValueAndValidity();
    if(this.formEntidad.invalid) return this._mensaje.mensajeInfo(`Formulario incompleto. Valide información.`);
    this.cancelSuscripcion.push(
      this._entidadService.putActualizaEntidad(this.getDataApi, this.formControl['id'].value)
      .subscribe((resp)=>{
        this._authService.setDataEntidad(resp.data);
        this._mensaje.mensajeSuccess(`La información de tu negocio ha sido actualizada exitosamente.`);
        this.onBtnCancelar();
      })
    )
  }

}
