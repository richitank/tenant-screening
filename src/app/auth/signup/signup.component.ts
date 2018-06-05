import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';
import { StoreSignup } from '../storeSignup.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(private authService: AuthService, private storeSignup: StoreSignup) { }

  ngOnInit() {
  }
  info = [
    {
      noOfUnits: '',
      firstName: '',
      lastName: '',      
      email: '',
    }
  ];
  onSignup(form: NgForm) {
    console.log(form.value.email);
    const noOfUnits = form.value.noOfUnits;
    const firstName = form.value.firstName;
    const lastName = form.value.lastName;
    const email = form.value.email;
    const password = form.value.password;
    
    this.authService.signupUser(email, password);

    this.info.push({
      noOfUnits: noOfUnits ,
      firstName: firstName,
      lastName: lastName,      
      email: email,
    });

    this.storeSignup.storeInfo(this.info)
      .subscribe(
          (response) => console.log(response),
          (error) => console.log(error)
      );
  }

  


}
