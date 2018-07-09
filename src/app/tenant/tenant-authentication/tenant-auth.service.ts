import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { TenantAuthData } from "./tenant-auth.model"

@Injectable()
export class TenantAuth {

    constructor(private httpClient: HttpClient){

    }

    login(email, login) {

    }

    createUser(firstName,lastName,applicantPhoneNo,email,password){
        const tenantAuthData: TenantAuthData = {
            firstName: firstName,
            lastName: lastName,
            applicantPhoneNo: applicantPhoneNo,
            email: email,
            password: password
        }
        this.httpClient.post("http://localhost:3000/api/tenant-user/signup", tenantAuthData)
            .subscribe(response => {
                console.log(response)
            })
    }
}