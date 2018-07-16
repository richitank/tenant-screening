import { TenantAppFormModel } from "./tenant-app-form.model";
import { Injectable } from "../../../../node_modules/@angular/core";
import { HttpClient } from "../../../../node_modules/@angular/common/http";

@Injectable()
export class TenantAppFormService {

    private formInfo: TenantAppFormModel[] = [];

    constructor(private http: HttpClient) { }

    storeTenantAppForm(formInfo) {
        this.formInfo.push(formInfo);
        console.log(this.formInfo);
        this.http.post("http://localhost:3000/api/tenant/tenant-application-form/post", formInfo)
        .subscribe(response => {
            console.log(response)
        })
    }

}