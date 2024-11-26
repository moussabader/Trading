import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../Entity/user';
import { LoginResponse } from '../Entity/loginResponse';
import { RegistrationRequest } from '../Entity/registration-request';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8094/home/auth';

  constructor(private http: HttpClient) {}

  loginUser(email: string, password: string): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiUrl}/authenticate`, { email, password });
  }

  registerUser(registerReq: RegistrationRequest): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/register`, registerReq);
  }

  activateUserAccount(code: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/activate-account?token=${code}`);
  }

  sendResetSms(phonenumber: string): Observable<string> {
    return this.http.post<string>(`${this.apiUrl}/send-sms`, { phonenumber });
  }

  verifyResetCode(code: string): Observable<boolean> {
    return this.http.get<boolean>(`${this.apiUrl}/verify-code?code=${code}`);
  }

  resetPassword(phonenumber: string, newPassword: string): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/reset-password`, { phonenumber, newPassword });
  }

  storeUserData(user: any): void {
    this.clearUserData();
    localStorage.setItem('user', JSON.stringify(user));
  }

  clearUserData(): void {
    localStorage.removeItem('user');
  }

  getCurrentUser() {
    const currentUser = localStorage.getItem('user');
    return currentUser ? JSON.parse(currentUser) : null;
  }

  storeToken(token: any): void {
    this.clearToken();
    localStorage.setItem('token', token);
  }
  
  clearToken(): void {
    localStorage.removeItem('token');
  }

  private decodeToken(token: string): any {
    try {
      const payload = token.split('.')[1];
      const decodedPayload = atob(payload);
      return JSON.parse(decodedPayload);
    } catch (error) {
      console.error('Token decoding failed', error);
      return null;
    }
  }

  isTokenExpired(): boolean {
    const token = localStorage.getItem('token');
    if (!token) return true; // Token does not exist, consider it expired

    const decodedToken = this.decodeToken(token);
    if (!decodedToken || !decodedToken.exp) return true; // If decoding fails or no `exp` field, consider it expired

    const currentTime = Math.floor(Date.now() / 1000); 
    
    return decodedToken.exp < currentTime;
  }
}
