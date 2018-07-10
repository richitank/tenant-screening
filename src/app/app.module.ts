import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { ScreeningRequestComponent } from './screeningRequestForm/screeningRequest/screeningRequest.component';
import { StoreSignup } from './screeningRequestForm/storeSignup.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import {MatToolbarModule} from '@angular/material/toolbar';

import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavbarComponent } from './navbar/navbar.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ScreeningReportsComponent } from "./screening-reports/screening-reports.component";
import { SigninAuthenticationComponent } from './authentication/signin/signin.component';
import { SignupAuthenticationComponent } from './authentication/signup/signup.component';
import { AuthenticationService } from './authentication/authentication.service';
import { TenantSignupComponent } from "./tenant/tenant-authentication/tenant-signup/tenant-signup.component";
import { TenantSigninComponent } from "./tenant/tenant-authentication/tenant-signin/tenant-signin.component";
import { TenantAuth } from "./tenant/tenant-authentication/tenant-auth.service";

import { AuthInterceptor } from './authentication/auth-interceptor';
import { AuthGuard } from './authentication/auth.guard';
import { TenantDashboardComponent } from './tenant/tenant-dashboard/tenant-dashboard.component';

const appRoutes = [

  {path: '', component: HomeComponent},
  
  {path: 'screening-request', component: ScreeningRequestComponent, canActivate: [AuthGuard]},
  
  {path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard]},

  {path: 'home-signin', component: SigninAuthenticationComponent},

  {path: 'home-signup', component: SignupAuthenticationComponent},

  {path: 'screening-reports', component: ScreeningReportsComponent},

  {path: 'tenant-signup', component: TenantSignupComponent},

  {path: 'tenant-signin', component:TenantSigninComponent},

  {path: 'tenant-dashboard', component: TenantDashboardComponent},

];

@NgModule({
  declarations: [
    AppComponent,
    ScreeningRequestComponent,
    HomeComponent,
    NavbarComponent,
    DashboardComponent,
    SigninAuthenticationComponent,
    SignupAuthenticationComponent,
    ScreeningReportsComponent,
    TenantSignupComponent,
    TenantSigninComponent,
    TenantDashboardComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule,
    BrowserAnimationsModule,
    MatToolbarModule
  ],
  providers: [StoreSignup, AuthenticationService, {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}, AuthGuard, TenantAuth], 
  bootstrap: [AppComponent]
})
export class AppModule { }
