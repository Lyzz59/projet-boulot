import { TimeTracking } from './../models/timetracking';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TimetrackingService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  create(data:any){
    return this.http.post(`${this.apiUrl}/user/timeTrackings`, data);
  }
  getAll(){
    return this.http.get<TimeTracking[]>(`${this.apiUrl}/admin/timeTrackings`);
  }
  getAllByUserId(date:string){
    return this.http.get<TimeTracking[]>(`${this.apiUrl}/user/timeTrakings?fromDate=${date}`);
  }
  update(data:any, id: string){
    return this.http.put(`${this.apiUrl}/user/timeTrackings/${id}`, data);
  }
  deleteOne(id: number){
    return this.http.delete(`${this.apiUrl}/user/timeTrackings/${id}`);
  }


  //http://localhost:8080/user/timeTrakings?fromDate=${dateEntre}
}
