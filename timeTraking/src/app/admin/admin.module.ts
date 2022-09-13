import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminNavbarComponent } from './components/admin-navbar/admin-navbar.component';
import { HomeAdminComponent } from './container/home-admin/home-admin.component';
import { ClientsComponent } from './container/clients/clients.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MembresComponent } from './container/membres/membres.component';
import { MatDialogModule } from '@angular/material/dialog';
import { InsClientComponent } from './container/ins-client/ins-client.component';
import { ProjectsComponent } from './container/projects/projects.component';
import { InsProjectComponent } from './container/ins-project/ins-project.component';
import { SharedModule } from '../shared/shared.module';
import { FooterComponent } from './components/footer/footer.component';

@NgModule({
  declarations: [
    HomeAdminComponent,
    AdminNavbarComponent,
    ClientsComponent,
    MembresComponent,
    InsClientComponent,
    ProjectsComponent,
    InsProjectComponent,
    FooterComponent,
  ],
  exports: [
    AdminNavbarComponent,
    MatDialogModule,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    ReactiveFormsModule,
    MatDialogModule,
    SharedModule,
  ]
})
export class AdminModule { }
