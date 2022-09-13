import { SharedModule } from './../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { TimetrackingComponent } from './containers/timetracking/timetracking.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TimeRoutingModule } from './time-routing.module';
import { AdminModule } from '../admin/admin.module';
import { InsTimetrackingComponent } from './containers/ins-timetracking/ins-timetracking.component';

@NgModule({
  declarations: [
    TimetrackingComponent,
    InsTimetrackingComponent,
  ],
  imports: [
    CommonModule,
    TimeRoutingModule,
    ReactiveFormsModule,
    AdminModule,
    SharedModule
  ]
})
export class TimeModule { }
