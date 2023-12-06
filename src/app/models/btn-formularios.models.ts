export interface estadoBtnFormulario{
  btnCrear: dataBtn,
  btnGuardar: dataBtn,
  btnEditar: dataBtn,
  btnActualizar: dataBtn,
  btnCancelar: dataBtn,
  btnVer: dataBtn,
  btnImprimir: dataBtn
}

interface dataBtn {
  estado: boolean,
  nombre?: string,
  icon?: string
}

export class BtnFormularios {

  private btnFormulario!: estadoBtnFormulario;

  constructor(){
    this.setBtnFormulario();
  }

  private setBtnFormulario(){
    this.btnFormulario = {
      btnCrear:{estado: false, nombre: "Nuevo", icon: "add_circle"},
      btnGuardar:{estado: false, nombre: "Guardar", icon: "save"},
      btnEditar:{estado: false, nombre: "Editar", icon: "edit"},
      btnActualizar:{estado: false, nombre: "Actualizar", icon: "sync"},
      btnCancelar:{estado: false, nombre: "Cancelar", icon: "close"},
      btnVer:{estado: false, nombre: "Buscar", icon: "search"},
      btnImprimir: {estado: false, nombre: "Imprimir", icon: "print"}
    };
  }

  public get getBtnFormulario(){
    return this.btnFormulario;
  }

}