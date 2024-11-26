import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../Entity/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:8094/home/user'; // Remplacez par l'URL de votre API

  constructor(private http: HttpClient) {}

  // Récupérer tous les utilisateurs
  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/get-all-users`);
  }

  // Récupérer un utilisateur par ID
  getUserById(userId: number): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/get-user/${userId}`);
  }

  // Modifier un utilisateur
  modifyUser(user: User): Observable<User> {
    return this.http.put<User>(`${this.apiUrl}/modify-user`, user);
  }

  // Supprimer un utilisateur
  removeUser(userId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/remove-user/${userId}`);
  }

  VerifyPassword(userId: number, typedPassword: string): Observable<boolean> {
    return this.http.post<boolean>(`${this.apiUrl}/verify-password`, {userId, typedPassword});
  }

  changeStatus(userId: number, status: boolean): Observable<User> {
    return this.http.put<User>(`${this.apiUrl}/change-status?status=${status}&userId=${userId}`,{});
  }
}
