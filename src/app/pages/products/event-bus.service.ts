import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventBusService {
  private subject = new Subject();

  constructor() { }

  emit(event: any ,data: any) {
    this.subject.next({event, data})
}

  listen(event: any, callBack: (value: any) => void) {
    this.subject.asObservable().subscribe((e: any) => {
        if (event === e.event) {
          callBack(e.data)
        }
    })
  }
}
