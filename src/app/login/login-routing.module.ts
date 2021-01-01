import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SignupComponent } from './components/signup/signup.component';
import { SigninComponent } from './components/signin/signin.component';

const routes: Routes = [
  {
    path: 'registration',
    component: SignupComponent, // another child route component that the router renders
  },
  {
    path: '', // child route path
    component: SigninComponent, // child route component that the router renders
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoginRoutingModule { }
