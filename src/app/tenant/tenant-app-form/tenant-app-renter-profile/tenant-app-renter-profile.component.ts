import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tenant-app-renter-profile',
  templateUrl: './tenant-app-renter-profile.component.html',
  styleUrls: ['./tenant-app-renter-profile.component.css']
})
export class TenantAppRenterProfileComponent implements OnInit {
  annualSalary: number = 0;

  constructor() { }

  ngOnInit() {
  }

}
