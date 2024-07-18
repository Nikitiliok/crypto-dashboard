import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environment/environment';
import { Observable } from 'rxjs';

export interface HistoricalDataItem {
  time_period_start: string;
  price_close: number;
}

@Injectable({
  providedIn: 'root'
})
export class CryptoHistoryService {
  private apiUrl = 'https://rest.coinapi.io/v1/ohlcv/BITSTAMP_SPOT_{0}/history';

  constructor(private http: HttpClient) {}

  getHistoricalData(symbol: string): Observable<HistoricalDataItem[]> {
    const endDate = new Date();
    const startDate = new Date(endDate);
    startDate.setDate(startDate.getDate() - 60);

    const params = {
      period_id: '1DAY',
      time_start: startDate.toISOString(),
      time_end: endDate.toISOString(),
      apikey: environment.coinApiKey
    };

    return this.http.get<HistoricalDataItem[]>(this.apiUrl.replace('{0}', symbol), { params });
  }
}
