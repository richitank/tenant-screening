import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';
import { StoreSignup } from '../storeSignup.service';
import { HttpClient } from "@angular/common/http";
import { AuthSignup } from '../authSignup.model';
import { AuthenticationService } from '../../authentication/authentication.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit, OnDestroy {
    info = []; //Stores Landlord info which is pushed to the Firebase database
    
     userIsAuthenticated = false;    
     private authStatusSub :Subscription;
  

  constructor(private authService: AuthService, //Firebase authentication
              private storeSignup: StoreSignup, 
              private http: HttpClient, 
              private authenticationService :AuthenticationService) //Node.js authentication
              { }

  ngOnInit() {
    this.userIsAuthenticated = this.authenticationService.getIsAuth();
    this.authStatusSub = this.authenticationService
      .getAuthStatusListener()
      .subscribe(isAuthenticated => {
        this.userIsAuthenticated = isAuthenticated;
        console.log(isAuthenticated);
      });
 }

  ngOnDestroy() {
   this.authStatusSub.unsubscribe();
  }
  

  onSignup(form: NgForm) {
    this.authService.isAuthenticated()
    console.log(form.value.email);
    
    //tenant details
    const option = form.value.opt1;
    const applicantFirstName = form.value.applicantFirstName;
    const applicantLastName = form.value.applicantLastName;
    const applicantEmail = form.value.applicantEmail;
    const applicantPhoneNo = form.value.applicantPhoneNo;

    //Landlord/owner details
    // const noOfUnits = form.value.noOfUnits;
    // const firstName = form.value.firstName;
    // const lastName = form.value.lastName;
    // const email = form.value.email;
    // const password = form.value.password;


    console.log("fgdffgdfg=>" +applicantFirstName)
    
    //To sign up user for the first time.
    // this.authService.signupUser(email, password);

    // this.info.push({
    //   noOfUnits: noOfUnits ,
    //   firstName: firstName,
    //   lastName: lastName,      
    //   email: email
    // });
    
    
    this.storeSignup.storeInfo(this.info)
      .subscribe(
          (response) => console.log(response),
          (error) => console.log(error)
      );


     const infoSentToServer = {
       applicantFirstName:applicantFirstName, 
       applicantLastName: applicantLastName,
       applicantEmail: applicantEmail, 
       applicantPhoneNo: applicantPhoneNo,
       screeningCost: option, 

       //ownerFirstName: firstName,
       //ownerLastName: lastName,
       //email: email,
       //noOfUnits: noOfUnits

      }
    //  this.http.post<{message: string}>('http://localhost:3000/api/welcome', infoSentToServer)
    //  .subscribe((responseData) => {
    //      console.log(responseData.message);         
    //  })
    this.storeSignup.sendSignupInfoToBackend(infoSentToServer)
    this.storeSignup.getInfo();
    
  }

      addAnotherApplicant(){
      console.log("addAnotherApplicant testing");
    }

}
