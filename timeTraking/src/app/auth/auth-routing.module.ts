import { isAdminGuardService, isAuthGuardService, isNotAuthGuardService } from './services/auth-guard.service';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './containers/login/login.component';
import { RegistrationComponent } from './containers/registration/registration.component';

const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: 'login'},
  {path: 'login', component: LoginComponent, canActivate: [isNotAuthGuardService]},
  {path: 'registration', component: RegistrationComponent, canActivate: [isAdminGuardService]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
