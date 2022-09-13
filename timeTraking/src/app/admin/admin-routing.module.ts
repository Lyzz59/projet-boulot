import { ProjectsComponent } from './container/projects/projects.component';
import { HomeAdminComponent } from './container/home-admin/home-admin.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientsComponent } from './container/clients/clients.component';
import { MembresComponent } from './container/membres/membres.component';
import { isAdminGuardService } from '../auth/services/auth-guard.service';

const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: 'home-admin'},
  {path: 'home-admin', component: HomeAdminComponent, canActivate: [isAdminGuardService] },
  {path: 'clients', component: ClientsComponent, canActivate: [isAdminGuardService] },
  {path: 'membres', component: MembresComponent, canActivate: [isAdminGuardService] },
  {path: 'projects', component: ProjectsComponent, canActivate: [isAdminGuardService] },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
