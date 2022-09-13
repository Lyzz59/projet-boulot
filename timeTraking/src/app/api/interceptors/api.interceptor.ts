import { environment } from 'src/environments/environment.prod';
import { AuthService } from './../../auth/services/auth.service';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';

@Injectable()
export class ApiInterceptor implements HttpInterceptor {

    constructor(private authService: AuthService){}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        const token = this.authService.getToken();
        
        const cloneReq = request.clone({
            headers: request.headers
            .set('Authorization', `Bearer ${token}`),
        url: request.url
        });

        return next.handle(cloneReq);
    }
}