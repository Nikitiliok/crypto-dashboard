import { Injectable } from '@angular/core';
import { WebSocketSubject, webSocket } from 'rxjs/webSocket';
import { environment } from '../../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class CryptoDataService {
  private socket$: WebSocketSubject<any>;

  constructor() {
    this.socket$ = webSocket(`wss://ws.coinapi.io/v1/?apikey=${environment.coinApiKey}`);
  }

  getRealTimeData(symbol: string) {
    this.socket$.next({type: 'hello', apikey: environment.coinApiKey, heartbeat: false, subscribe_data_type: ['trade'], subscribe_filter_symbol_id: [symbol]});
    return this.socket$.asObservable();
  }
}
