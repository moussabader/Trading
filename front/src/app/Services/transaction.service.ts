import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Transaction } from '../Entity/transaction';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  private baseUrl = 'http://localhost:8090/home/transaction';
  constructor(private http: HttpClient) {}
  getAllTransactions(): Observable<Transaction[]> {

    return this.http.get<Transaction[]>(`${this.baseUrl}/Get-all-transactions`);
  }
  getTransaction(transactionId: number): Observable<Transaction> {
    return this.http.get<Transaction>(`${this.baseUrl}/Get-transaction/${transactionId}`);
  }
  addTransaction(placingOrderId: number, transaction: Transaction): Observable<Transaction> {
    const url = `${this.baseUrl}/AddTransaction/${placingOrderId}`;
    return this.http.post<Transaction>(url, transaction);
  }
  modifyTransaction(transaction: Transaction): Observable<Transaction> {
    return this.http.put<Transaction>(`${this.baseUrl}/modify-transaction`, transaction);
  }
  removeTransaction(transactionId: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/remove-transaction/${transactionId}`);
  }
}