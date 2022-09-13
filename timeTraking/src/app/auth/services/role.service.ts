import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Role } from '../models/Role';

@Injectable({
  providedIn: 'root',
})
export class RoleService {
  private apiUrl = environment.apiUrl;

  constructor(private readonly http: HttpClient) {}

  getAll(): Observable<Role[]>{
    return this.http.get<Role[]>(`${this.apiUrl}/admin/roles`);
  }
}
