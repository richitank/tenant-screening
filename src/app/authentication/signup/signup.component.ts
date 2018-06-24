import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-authentication-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupAuthenticationComponent implements OnInit {

  constructor(public authentication: AuthenticationService) { }

  ngOnInit() {
  }
  
  onSignup(form: NgForm) {
    if(form.invalid) {
     return
   }
   console.log(form.value.email)
  this.authentication.createUser(form.value.noOfUnits, 
                                  form.value.firstName, 
                                  form.value.lastName,
                                  form.value.applicantPhoneNo, 
                                  form.value.email, 
                                  form.value.password
                                )
    }

}
