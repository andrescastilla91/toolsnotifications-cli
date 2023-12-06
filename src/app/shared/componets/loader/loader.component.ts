import { AfterViewInit, Component, inject } from '@angular/core';
import { LoaderService } from 'src/app/services/shared/loader.service';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent implements AfterViewInit {

  private _loaderService: LoaderService = inject(LoaderService);
  public estado : boolean = false;

  ngAfterViewInit(): void {
    this._loaderService.estado.subscribe((resp:boolean) => {
      this.estado = resp;
    });
  }
}
