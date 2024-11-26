import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StockQuoteService {
  private apiUrl = 'https://www.alphavantage.co/query';

  constructor(private http: HttpClient) {}
// search if Market Open/ closed
  searchStockSymbols(keywords: string, apiKey: string): Observable<any> {
    const params = {
      function: 'SYMBOL_SEARCH',
      keywords: keywords,
      apikey: apiKey
    };

    return this.http.get(this.apiUrl, { params });
  }

  // search symbol
  getStockQuote(symbol: string, apiKey: string): Observable<any> {
    const params = {
      function: 'GLOBAL_QUOTE',
      symbol: symbol,
      apikey: apiKey
    };
    return this.http.get(this.apiUrl, { params });
  }



}

