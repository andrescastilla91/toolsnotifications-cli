import { Injectable } from '@angular/core';
import { modelLoginCuentaWhatsappApiResponse } from 'src/app/models/notificacion-whatsapp/model-cuenta-whatsapp.models';
import Swal, { SweetAlertResult } from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class MessageNotificationService {

  public mensajeSuccess(msj:string){
    this.ToastSuccess.fire({icon: "success", title: msj})
  }

  public mensajeError(msj:string, titulo?:string){
    this.ToastError.fire({icon: "error", title: titulo , text: msj})
  }

  public mensajeInfo(msj:string){
    this.ToastInfo.fire({icon: "info", title: msj})
  }

  public mensajeConfirmacion(){

  }

  public mensajeAvisoImportante(msj:string): Promise<SweetAlertResult<any>> {
    return Swal.fire({
      title: msj,
      icon: 'info',
      showConfirmButton: true,
      allowOutsideClick: false,
      allowEscapeKey: false
    })
  }

  public mensajeNotiLoginWhatsApp(msj:string, data:modelLoginCuentaWhatsappApiResponse): Promise<SweetAlertResult<any>> {
    return Swal.fire({
      title: '¡Bienvenido/a a nuestra plataforma de notificaciones!',
      text: msj,
      timer: 30000,
      timerProgressBar: true,
      imageUrl: data.url,
      imageWidth: 300,
      imageHeight: 300,
      showConfirmButton: false,
      allowOutsideClick: false,
      allowEscapeKey: false
    })
  }

  private ToastError = Swal.mixin({
    toast: true,
    position: 'bottom-start',
    showConfirmButton: false,
    timer: 4000,
    timerProgressBar: true,
    width:'35rem',
    padding:'.4em 0 .4em .6em',
    background: '#f44336',
    color: '#fff',
    iconColor: '#fff',
    showClass: {
      popup: 'animate__animated animate__fadeInDown'
    },
    hideClass: {
      popup: 'animate__animated animate__zoomOut'
    },
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer)
      toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
  });

  private ToastSuccess = Swal.mixin({
    toast: true,
    position: 'bottom-start',
    showConfirmButton: false,
    timer: 4000,
    timerProgressBar: true,
    width:'35rem',
    padding:'.4em 0 .4em .6em',
    background: '#2E7D32',
    color: '#fff',
    iconColor: '#fff',
    showClass: {
      popup: 'animate__animated animate__fadeInDown'
    },
    hideClass: {
      popup: 'animate__animated animate__zoomOut'
    },
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer)
      toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
  });

  private ToastInfo = Swal.mixin({
    toast: true,
    position: 'bottom-start',
    showConfirmButton: false,
    timer: 4000,
    timerProgressBar: true,
    width:'35rem',
    padding:'.4em 0 .4em .6em',
    background: '#ffa000',
    color: '#000',
    iconColor: '#000',
    showClass: {
      popup: 'animate__animated animate__fadeInDown'
    },
    hideClass: {
      popup: 'animate__animated animate__zoomOut'
    },
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer)
      toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
  });
  
  
}