import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { AuthData } from "./auth-data.model";
import { Subject } from "rxjs";
import { Router } from "@angular/router";

@Injectable()
export class AuthenticationService {
    private token: string;
    private authStatusListener = new Subject<boolean>();
    private isAuthenticated = false;

    getToken() {
        return this.token;
    }
    
    getAuthStatusListener() {
        return this.authStatusListener.asObservable();
    }

    getIsAuth() {
        return this.isAuthenticated;
    }

    constructor(private http: HttpClient, private router: Router) {}

    createUser(noOfUnits: number, firstName: string, lastName: string, applicantPhoneNo: number, email: string, password: string) {
        const authData: AuthData = {
            noOfUnits: noOfUnits, 
            firstName: firstName, 
            lastName: lastName,
            applicantPhoneNo: applicantPhoneNo,
            email: email,
            password: password
        };
        this.http.post("http://localhost:3000/api/user/signup", authData)
            .subscribe((response) => {
                console.log(response)
            })
    }

    login(email: string, password: string) {
        //const authData: AuthData = {
            // email: email,
            // password: password
        //};
        this.http.post<{token: string}>("http://localhost:3000/api/user/signin", /*authData*/ {email: email,
        password: password})
        .subscribe((response) => {
            const token = response.token
            this.token = token;
            if(token) {
                this.isAuthenticated = true
                this.authStatusListener.next(true); 
            }
            // if login is succes, then Display logout buton and Remove Login/Signup button
            this.router.navigate(['/dashboard'])
        })

    }

    logout() {
        this.token = null;
        this.authStatusListener.next(false)
        this.router.navigate(['/']);

    }
}