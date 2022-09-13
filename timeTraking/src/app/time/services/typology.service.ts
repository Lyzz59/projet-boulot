import { Type_project } from './../models/type_project';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TypologyService {
  private apiUrl = environment.apiUrl;

  constructor(private readonly http: HttpClient){}

  getTypologyAll(): Observable<Type_project[]> {
    return this.http.get<Type_project[]>(`${this.apiUrl}/user/typologys`);
  }
}
