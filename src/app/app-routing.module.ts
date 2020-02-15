import { IndexComponent } from './index/index.component';
import { RegisterLoginComponent } from './register-login/register-login.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path : 'register',
    component: RegisterLoginComponent
  },
  {
    path: 'index',
    component: IndexComponent
  },
  {
    path : '',
    redirectTo : 'register',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
