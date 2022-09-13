import { Injectable } from '@angular/core';
import {
  Router,
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  CanDeactivate,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class isAuthGuardService implements CanActivate {
  constructor(public auth: AuthService, public router: Router) {}

  canActivate(): boolean {
    if (this.auth.isAuthenticated()) {
      return true;
    }
    this.router.navigate(['/auth/login']);
    return false;
  }
}

@Injectable({
  providedIn: 'root',
})
export class isNotAuthGuardService implements CanActivate {
  constructor(public auth: AuthService, public router: Router) {}

  canActivate(): boolean {
    if (this.auth.isAuthenticated()) {
      if (this.auth.isAdmin()) {
        this.router.navigate(['/admin/home-admin']);
      } else {
        this.router.navigate(['/time/timetracking']);
      }

      return false;
    }
    return true;
  }
}

@Injectable({
  providedIn: 'root',
})
export class isAdminGuardService implements CanActivate {
  constructor(public auth: AuthService, public router: Router) {}

  canActivate(): boolean {
    if (this.auth.isAuthenticated() && this.auth.isAdmin()) {
      return true;
    }
    this.router.navigate(['/time/timetracking']);
    return false;
  }
}
