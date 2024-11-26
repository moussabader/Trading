import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Portfolio } from '../Entity/portfolio';

@Injectable({
  providedIn: 'root'
})
export class PortfolioService {
  private baseUrl = 'http://localhost:8090/home/portfolio';
  constructor(private http: HttpClient) {}
  
  getAllPortfolios(): Observable<Portfolio[]> {
    return this.http.get<Portfolio[]>(`${this.baseUrl}/Get-all-portfolios`);
  }

  getPortfolioById(portfolioId: number): Observable<Portfolio> {
    return this.http.get<Portfolio>(`${this.baseUrl}/Get-portfolio/${portfolioId}`);
  }

  modifyPortfolio(portfolio: Portfolio): Observable<Portfolio> {
    return this.http.put<Portfolio>(`${this.baseUrl}/modify-portfolio`, portfolio);
  }

  deletePortfolio(portfolioId: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/remove-portfolio/${portfolioId}`);
  }
}
