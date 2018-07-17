import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { NgForm } from "@angular/forms";

@Component({
  selector: 'app-tenant-add-coapplicant',
  templateUrl: './tenant-add-coapplicant.component.html',
  styleUrls: ['./tenant-add-coapplicant.component.css']
})
export class TenantAddCoapplicantComponent implements OnInit {

  constructor(private router: Router) { }

  onClick(form: NgForm) {
    console.log(form.value);
    this.router.navigate(['/tenant-rent-application-form/renter-profile'])
  }

  ngOnInit() {
  }

}
