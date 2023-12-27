import { HttpRequest } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FormatTextService {

  formatearTextoWhatsApp(textoHTML: string): string {
    const div = document.createElement('div');
    div.innerHTML = textoHTML;

    return this.procesarNodos(div);
  }

  private procesarNodos(elemento: HTMLElement): string {
    let resultado = '';
    elemento.childNodes.forEach(child => {
      if (child.nodeType === Node.TEXT_NODE) {
        resultado += child.textContent || '';
      } else if (child.nodeType === Node.ELEMENT_NODE) {
        resultado += this.procesarEtiqueta(child as HTMLElement);
      }
    });
    return resultado;
  }

  private procesarEtiqueta(etiqueta: HTMLElement): string {
    const tagName = etiqueta.tagName.toLowerCase();
    
    if (tagName in setUpFormateoTextWhatsapp) {
      const estiloInicio = setUpFormateoTextWhatsapp[tagName as keyof typeof setUpFormateoTextWhatsapp];
      const contenido = this.procesarNodos(etiqueta);
      const estiloFin = setUpFormateoTextWhatsapp[tagName as keyof typeof setUpFormateoTextWhatsapp];
      return `${estiloInicio}${contenido}${estiloFin}`;
    }
    return this.procesarNodos(etiqueta);
  }

}


enum setUpFormateoTextWhatsapp {
  'p' = '\n',
  'strong' = '*',
  'em' = '_',
  's' = '~',
  'u' = '```',
}