import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class SidenavService {

  private isOpenedSubject = new Subject<boolean>();
  public isOpened$ = this.isOpenedSubject.asObservable();

  open() {
    this.isOpenedSubject.next(true);
  }

 close() {
    this.isOpenedSubject.next(false);
 }

}