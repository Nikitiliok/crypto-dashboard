import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedDataService {
  private symbolSubject = new Subject<string>;

  constructor() {}

  setSymbol(symbol: string) {
    this.symbolSubject.next(symbol);
  }

  getSymbol() {
    return this.symbolSubject.asObservable();
  }
}
