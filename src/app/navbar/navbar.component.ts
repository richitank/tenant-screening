import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthenticationService } from '../authentication/authentication.service';
import { Subscription } from 'rxjs';
import { TenantAuth } from '../tenant/tenant-authentication/tenant-auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, OnDestroy {
  userIsAuthenticated = false;
  private authListenerSubs: Subscription;

  tenantIsAuthenticated = false;
  private tenantAuthListenerSubs: Subscription;

  constructor(private authenticationService: AuthenticationService, private tenantAuth: TenantAuth) { }

  ngOnInit() {
    // auth listener
    this.userIsAuthenticated = this.authenticationService.getIsAuth();
    this.authListenerSubs = this.authenticationService.getAuthStatusListener()
      .subscribe(isAuthenticated => {
        this.userIsAuthenticated = isAuthenticated;
      });
      
      //Another auth listener
      this.tenantAuthListenerSubs = this.tenantAuth.getAuthStatusListener()
        .subscribe(isAuthenticated => {
          this.tenantIsAuthenticated = isAuthenticated
          console.log(this.tenantIsAuthenticated)
        });
  }
  ngOnDestroy() {
    this.authListenerSubs.unsubscribe();
    this.tenantAuthListenerSubs.unsubscribe();
  }

  onLogout() {
    this.authenticationService.logout();
  }

}
