import { environment } from './../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import jwt_decode from 'jwt-decode';
import { Router} from '@angular/router';


@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient, private router: Router) {}

  authenticate(credentials: { email: string; password: string }) {
    this.http
      .post(`${this.apiUrl}/auth/login`, {
        email: credentials.email,
        password: credentials.password,
      })
      .subscribe((data: any) => {
        this.setToken(data.token);
        if(this.isAdmin()){
          this.router.navigate(['/admin/home-admin']);
        } else {
          this.router.navigate(['/time/timetracking']);
        }
      });
      
  }

  isAuthenticated(): boolean{
    const token = this.getToken();
    if(!token){
      return false;
    }

    return true;
  }

  setToken(token: string) {
    localStorage.setItem('token', token);
  }

  getToken(): any {
    const token = localStorage.getItem('token');
    return token;
  }

  getDecodedToken(): any{
    const token = localStorage.getItem('token');
    if(!token){
      return null;
    }
    const decodedToken = jwt_decode(token);
    return decodedToken;
  }
  
  isAdmin(): boolean{
    const token = this.getDecodedToken();
    if(token.rolesId.includes(1)){
      return true;
    }
    return false;
  }

  registration(data: any) {
    return this.http.post(`${this.apiUrl}/admin/registration`, data);
  }
  
  updateUser(data: any, id: string){
    return this.http.put(`${this.apiUrl}/admin/users/${id}`, data);
  }

  deleteUser(id: number){
    return this.http.delete(`${this.apiUrl}/admin/users/${id}`);
  }
  deleteClient(id: number){
    return this.http.delete(`${this.apiUrl}/admin/clients/${id}`);
  }

  logout(){
    localStorage.removeItem('token');
    this.router.navigate(['/auth/login']);

  }
}
