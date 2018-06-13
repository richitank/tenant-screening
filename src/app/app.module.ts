import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { SignupComponent } from './auth/signup/signup.component';
import { SigninComponent } from './auth/signin/signin.component';
import { AuthService } from './auth/auth.service';
import { StoreSignup } from './auth/storeSignup.service';
import { HttpClientModule } from '@angular/common/http'

import { Routes, RouterModule } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';

const appRoutes = [
  {path: '', component: HomeComponent},
  {path: 'signup', component: SignupComponent},
  {path: 'signin', component: SigninComponent},
  // { path: 'loggedin', component: HeaderComponent}
 
];

@NgModule({
  declarations: [
    AppComponent,
    SigninComponent,
    SignupComponent,
    HeaderComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule
  ],
  providers: [AuthService, StoreSignup],
  bootstrap: [AppComponent]
})
export class AppModule { }
