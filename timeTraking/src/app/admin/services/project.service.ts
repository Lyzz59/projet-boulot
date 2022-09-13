import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { Project } from '../models/Project';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  private apiUrl = environment.apiUrl;
  constructor(private readonly http: HttpClient) { }

  createProject(data:any){
    return this.http.post(`${this.apiUrl}/admin/projects`, data);
  }
  
  getProjectAll() {
    return this.http.get<Project[]>(`${this.apiUrl}/admin/projects`);
  }
  getAllActiveProject(){
    return this.http.get<Project[]>(`${this.apiUrl}/admin/projects/active`);
  }
  updateProject(data:any, id: string){
    return this.http.put(`${this.apiUrl}/admin/projects/${id}`, data);
  }
  deleteProject(id: number){
    return this.http.delete(`${this.apiUrl}/admin/projects/${id}`);
  }
}
