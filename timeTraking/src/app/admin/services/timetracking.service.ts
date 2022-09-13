import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TimeTracking } from 'src/app/time/models/timetracking';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class TimetrackingService {
  private apiUrl = environment.apiUrl;
  
  constructor(private http: HttpClient) {}

   getAll(weekNumber: number){
    return this.http.get<TimeTracking[]>(`${this.apiUrl}/admin/timeTrackings/${weekNumber}`);
  }
}
