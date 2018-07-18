import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { TenantAuthData } from "./tenant-auth.model"
import { Subject } from "rxjs";

@Injectable()
export class TenantAuth {
    private isAuthenticated = false;
    private token: string;
    private tokenTimer: any;
    private authStatusListener = new Subject<boolean>()

    constructor(private httpClient: HttpClient, private router: Router) { }

    //returns token
    getToken() {
        return this.token;
    }

    //Check whether user is authenticated
    getIsAuth() {
        return this.isAuthenticated;
    }

    //returns true/false based on user's authentication
    getAuthStatusListener() {
        return this.authStatusListener.asObservable();
    }


    login(email: string, password: string) {
        this.httpClient.post<{ token: string, expiresIn: number }>("http://localhost:3000/api/tenant-user/signin", { email: email, password: password })
            .subscribe(response => {
                const token = response.token;
                this.token = token;
                if (token) {
                    const expiresInDuration = response.expiresIn;
                    this.setAuthTimer(expiresInDuration);
                    this.isAuthenticated = true;
                    this.authStatusListener.next(true);
                    const now = new Date();
                    const expirationDate = new Date(now.getTime() + expiresInDuration * 500);
                    this.saveAuthData(token, expirationDate);
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
        this.authStatusListener.next(false);
        clearTimeout(this.tokenTimer);
        this.deleteAuthData();
        this.router.navigate(['/']);
    }

    saveAuthData(token, expirationDate) {
        localStorage.setItem('token', token);
        localStorage.setItem('expiration', expirationDate.toISOString());
    }

    deleteAuthData() {
        localStorage.removeItem('token');
        localStorage.removeItem('expiration');
    }

    autoAuthUser() {
        const authInformation = this.getAuthData();
        const now = new Date();
        const expiresIn = authInformation.expirationDate.getTime() - now.getTime();
        if (expiresIn > 0) {
            this.token = authInformation.token;
            this.isAuthenticated = true;
            this.setAuthTimer(expiresIn);
            this.authStatusListener.next(true);
        }
    }

    private setAuthTimer(expiresInDuration: number) {
        this.tokenTimer = setTimeout(() => { this.logout() }, expiresInDuration * 500)
    }

    private getAuthData() {
        const token = localStorage.getItem('token');
        const expirationDate = localStorage.getItem('expiration');
        if (!token || !expirationDate) {
            return;
        }
        return {
            token: token,
            expirationDate: new Date(expirationDate)

        }
    }
}