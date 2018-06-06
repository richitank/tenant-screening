import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';
import { StoreSignup } from '../storeSignup.service';
import { Mailer } from '../mailer.service'
import { HttpClient } from "@angular/common/http";


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(private authService: AuthService, private storeSignup: StoreSignup, private http: HttpClient /*private mailer: Mailer */) { }

  ngOnInit() {
  }


  info = [{}];

  applicantInfo = {}


  onSignup(form: NgForm) {
    this.authService.isAuthenticated()
    console.log(form.value.email);
    const noOfUnits = form.value.noOfUnits;
    const firstName = form.value.firstName;
    const lastName = form.value.lastName;
    const email = form.value.email;
    const password = form.value.password;
    const opt1 = form.value.opt1;
    const applicantEmail = form.value.applicantEmail;
    //console.log(opt1)
    
    this.authService.signupUser(email, password);

    this.info.push({
      noOfUnits: noOfUnits ,
      firstName: firstName,
      lastName: lastName,      
      email: email
    });
    

  
    
    this.storeSignup.storeInfo(this.info)
      .subscribe(
          (response) => console.log(response),
          (error) => console.log(error)
      );


     console.log(applicantEmail)
     const applicantInfo = {email: applicantEmail}
     this.http.post<{message: string}>('http://localhost:3000/api/welcome', applicantInfo)
     .subscribe((responseData) => {
         console.log(responseData.message);
         
     })
      

  } 

}
