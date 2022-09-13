import { environment } from './../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Client } from '../models/Client';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  client(data:any){
    return this.http.post(`${this.apiUrl}/admin/clients`, data);
  }
  updateClient(data: any, id: string){
    return this.http.put(`${this.apiUrl}/admin/clients/${id}`, data);
  }
  getAllClients(){
    return this.http.get<Client[]>(`${this.apiUrl}/admin/clients`);
  }
}
