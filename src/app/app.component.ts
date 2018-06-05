import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  ngOnInit() {
    firebase.initializeApp({
      apiKey: "AIzaSyAzz7jwDlLYB7LXAUAbZCynMpa7a0nkGhE",
      authDomain: "offrbox-tenant-screening.firebaseapp.com",
    })

  }
}
