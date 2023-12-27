import { Component, ViewChild, inject } from '@angular/core';
import { FormControl } from '@angular/forms';
import { QuillEditorComponent } from 'ngx-quill';
import { FormatTextService } from 'src/app/services/shared/format-text.service';

@Component({
  selector: 'app-editor-texto',
  templateUrl: './editor-texto.component.html',
})
export class EditorTextoComponent {

  private _formatTextService: FormatTextService = inject(FormatTextService);

  @ViewChild('editor', { static: false }) set quill(value: QuillEditorComponent) { 
    value.placeholder = 'Escribe tu mensaje aquí...'
    value.styles = {height: '200px', width: '100%'},
    value.modules = {
      toolbar: [
        ['bold', 'italic', 'underline', 'strike'],
      ]
    };
  }

  protected dataEditor: FormControl = new FormControl(['']);

  public get getValueEditorTexto():string{
    return this._formatTextService.formatearTextoWhatsApp(this.dataEditor.value)
  }

  public clearEditorTexto(){
    this.dataEditor.setValue('');
  }

  
}
