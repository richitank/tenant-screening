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
    this.authentication.createUser(form.value.email, form.value.password)
  }

}
