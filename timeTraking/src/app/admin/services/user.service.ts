import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { User } from '../models/User';


@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = environment.apiUrl;

  constructor(private readonly http: HttpClient) {}

  getUserAll(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/admin/users`);
  }

  getUser(): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/admin/users/2`);
  }

  // createUser(user: User): Observable<User> {
  //   return this.http.post<User>(`${this.apiUrl}/admin/users`, user);
  // }

  // updateUser(user: User): Observable<User> {
  //   return this.http.put<User>(`${this.apiUrl}/admin/users`, user);
  // }
  
  // deleteUser(id: number): Observable<User> {
  //   return this.http.delete<User>(`${this.apiUrl}/admin/users/${id}`);
  // }
}
