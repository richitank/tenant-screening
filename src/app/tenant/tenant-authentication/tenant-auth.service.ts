import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { TenantAuthData } from "./tenant-auth.model"

@Injectable()
export class TenantAuth {
    private token: string;

    constructor(private httpClient: HttpClient, private router: Router){ }

    C () {
        this.token;
    }

    login(email, password) {
        this.httpClient.post("http://localhost:3000/api/tenant-user/signin", {email: email, password: password})
            .subscribe(response => {
                console.log(response)
                this.router.navigate(['/tenant-dashboard'])
            })

    }

    createUser(firstName, lastName, applicantPhoneNo, email, password){
        const tenantAuthData: TenantAuthData = {
            firstName: firstName,
            lastName: lastName,
            applicantPhoneNo: applicantPhoneNo,
            email: email,
            password: password
        }
        this.httpClient.post<{token: string}>("http://localhost:3000/api/tenant-user/signup", tenantAuthData)
            .subscribe(response => {
                this.router.navigate(['/tenant-signin'])
            })
    }
}