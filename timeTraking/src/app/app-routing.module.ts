import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: 'auth'},
  {path: 'auth', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)},
  {path: 'time', loadChildren: () => import('./time/time.module').then(m => m.TimeModule)}, 
  {path: 'admin', loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule)}, 
  {path: '**', pathMatch:'full', redirectTo: 'auth'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
