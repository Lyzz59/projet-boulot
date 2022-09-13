import { MaterialModule } from './material/material.module';
import { InsProjectComponent } from './admin/container/ins-project/ins-project.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule, LOCALE_ID } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ApiInterceptor } from './api/interceptors/api.interceptor';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RegistrationComponent } from './auth/containers/registration/registration.component';
import { InsClientComponent } from './admin/container/ins-client/ins-client.component';
import { InsTimetrackingComponent } from './time/containers/ins-timetracking/ins-timetracking.component';

import { registerLocaleData } from '@angular/common';
import * as fr from '@angular/common/locales/fr';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MaterialModule
  ],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: ApiInterceptor, multi: true},{provide: LOCALE_ID, useValue: 'fr-FR',}],
  bootstrap: [AppComponent],
  entryComponents:[RegistrationComponent, InsClientComponent, InsTimetrackingComponent, InsProjectComponent],
})
export class AppModule { 
  constructor(){
    registerLocaleData(fr.default);
  }
}
