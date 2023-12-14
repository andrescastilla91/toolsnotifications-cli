import { Component, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-header-modals',
  templateUrl: './header-modals.component.html'
})
export class HeaderModalsComponent {

  @Input() titulo: string = "";
  @Input() dialogRef: MatDialogRef<any> | null = null;

  cerrarFormulario(){
    this.dialogRef!.close()
  }

}
