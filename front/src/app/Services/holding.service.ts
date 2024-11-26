import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Holding } from '../Entity/holding';

@Injectable({
  providedIn: 'root'
})
export class HoldingService {
  private baseUrl = 'http://localhost:8090/home/holding';
  constructor(private http: HttpClient) {}
  getAllHoldings(): Observable<Holding[]> {
    return this.http.get<Holding[]>(`${this.baseUrl}/Get-all-holdings`);
  }
  getHolding(holdingId: number): Observable<Holding> {
    return this.http.get<Holding>(`${this.baseUrl}/Get-holding/${holdingId}`);
  }
  addHolding(holding: Holding): Observable<Holding> {
    return this.http.post<Holding>(`${this.baseUrl}/Add-Holding`, holding);
  }
  modifyHolding(holding: Holding): Observable<Holding> {
    return this.http.put<Holding>(`${this.baseUrl}/modify-holding`, holding);
  }
  removeHolding(holdingId: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/remove-holding/${holdingId}`);
  }
}
