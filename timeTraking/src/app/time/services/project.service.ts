import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Project } from '../models/project';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

private apiUrl = environment.apiUrl;

  constructor(private readonly http: HttpClient){}

  getProjectAll(): Observable<Project[]> {
    return this.http.get<Project[]>(`${this.apiUrl}/user/projects`);
  }
}
