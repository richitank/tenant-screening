import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { SignupComponent } from './auth/signup/signup.component';
import { SigninComponent } from './auth/signin/signin.component';
import {OwnerInfoComponent } from './owner-info/owner-info.component';
import {ApplicantInfoComponent } from './applicant-info/applicant-info.component';

const appRoutes: Routes = [
    {
        path: 'signup', component: SignupComponent
    }
];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
  })
  export class AppRoutingModule {
  
  }