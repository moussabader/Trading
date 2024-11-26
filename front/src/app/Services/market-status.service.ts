// market-status.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MarketStatusService {
  private apiKey = 'GB675A5CC0KN3LWL'; 
  private baseUrl = 'https://www.alphavantage.co/query';

  constructor(private http: HttpClient) {}

  getMarketStatus(): Observable<any> {
    const params = {
      function: 'MARKET_STATUS',
      apikey: this.apiKey,
    };
    return this.http.get<any>(this.baseUrl, { params });
  }
}
