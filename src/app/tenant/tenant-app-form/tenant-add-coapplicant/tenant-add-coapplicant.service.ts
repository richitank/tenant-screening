import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { TenantAddCoapplicantModel } from "./tenant-add-copplicant.model";

@Injectable()
export class TenantAddCoApplicantService {
    coApplicantDetails: TenantAddCoapplicantModel[] = [];
    constructor(private http: HttpClient) { }

    sendMail(coApplicantDetails) {
        this.coApplicantDetails = coApplicantDetails;
        console.log(this.coApplicantDetails)
        this.http.post("http://localhost:3000/api/tenant/tenant-application-form/add-co-applicant", coApplicantDetails)
            .subscribe((response) => {
                console.log(response);
            })
    }
}