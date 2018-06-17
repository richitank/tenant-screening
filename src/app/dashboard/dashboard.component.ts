import { Component, OnInit, OnDestroy } from '@angular/core';
import { StoreSignup } from "../auth/storeSignup.service";
import { AuthSignup } from "../auth/authSignup.model";
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy{
  infoSentToServer: AuthSignup[] = [];
  private infoSentToServerSub: Subscription;

  constructor(public storeSignup: StoreSignup) { }

  ngOnInit() {
    this.infoSentToServer = this.storeSignup.getInfo();
    console.log("test");
    console.log(this.infoSentToServer);
    this.infoSentToServerSub = this.storeSignup.getInfoUpdateListener()
      .subscribe((signupInfo: AuthSignup[]) => {
        this.infoSentToServer = signupInfo
      });
  }
  onClick() {
    for (var i=0; i<this.infoSentToServer.length; i++) {
      console.log(this.infoSentToServer[i].applicantEmail);
  }
  }

  ngOnDestroy() {
    this.infoSentToServerSub.unsubscribe();
  }
  
}
