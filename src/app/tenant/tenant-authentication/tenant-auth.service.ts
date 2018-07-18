import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { TenantAuthData } from "./tenant-auth.model"
import { Subject } from "rxjs";

@Injectable()
export class TenantAuth {
    private isAuthenticated = false;
    private token: string;
    private authStatusListener = new Subject<boolean>()

    constructor(private httpClient: HttpClient, private router: Router) { }

    getToken() {
        this.token;
    }

    //Check whether user is authenticated
    getIsAuth() {
        return this.isAuthenticated;
    }

    getAuthStatusListener() {
        return this.authStatusListener.asObservable();
    }


    login(email: string, password: string) {
        this.httpClient.post<{ token: string }>("http://localhost:3000/api/tenant-user/signin", { email: email, password: password })
            .subscribe(response => {
                const token = response.token;
                this.token = token;
                if (token) {
                    this.isAuthenticated = true;
                    this.authStatusListener.next(true);
                    this.router.navigate(['/tenant-dashboard']);
                }
            })
    }

    createUser(firstName, lastName, applicantPhoneNo, email, password) {
        const tenantAuthData: TenantAuthData = {
            firstName: firstName,
            lastName: lastName,
            applicantPhoneNo: applicantPhoneNo,
            email: email,
            password: password
        }
        this.httpClient.post("http://localhost:3000/api/tenant-user/signup", tenantAuthData)
            .subscribe(response => {
                console.log(response);
                this.router.navigate(['/tenant-signin']);
            })
    }

    logout() {
        this.token = null;
        this.authStatusListener.next(false)
        this.router.navigate(['/']);

    }
}