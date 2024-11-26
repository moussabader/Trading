import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PlacingOrder } from '../Entity/placing-order';

@Injectable({
  providedIn: 'root'
})
export class PlacingOrderService {
  // url in spring:  http://localhost:8090/home/placingOrder/{{portfolioId}}/add-order
  private baseUrl = 'http://localhost:8090/home/placingOrder';
  constructor(private http: HttpClient) {}

  addPlacingOrder(portfolioId: string, order: PlacingOrder): Observable<PlacingOrder> {
    const url = `${this.baseUrl}/${portfolioId}/add-order`;
    console.log('Making POST request to:', url);
    return this.http.post<PlacingOrder>(url, order);
}
  getAllPlacingOrders(): Observable<PlacingOrder[]> {
    return this.http.get<PlacingOrder[]>(`${this.baseUrl}/Get-all-placingOrders`);
  }
  getPlacingOrder(placingOrderId: number): Observable<PlacingOrder> {
    return this.http.get<PlacingOrder>(`${this.baseUrl}/Get-placingOrder/${placingOrderId}`);
  }
  modifyPlacingOrder(order: PlacingOrder): Observable<PlacingOrder> {
    return this.http.put<PlacingOrder>(`${this.baseUrl}/modify-placingOrder`, order);
  }
  removePlacingOrder(placingOrderId: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/remove-placingOrder/${placingOrderId}`);
  }
}
