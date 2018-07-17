import { TenantAppFormModel } from "./tenant-app-form.model";
import { Injectable } from "../../../../node_modules/@angular/core";
import { HttpClient } from "../../../../node_modules/@angular/common/http";
import { Subject } from "../../../../node_modules/rxjs";

@Injectable()
export class TenantAppFormService {

    private formInfo: TenantAppFormModel[] = [];
    private infoUpdated = new Subject<TenantAppFormModel[]>()

    constructor(private http: HttpClient) { }

    storeTenantAppForm(formInfo) {
        this.formInfo.push(formInfo);
        this.infoUpdated.next([...this.formInfo])
        this.http.post("http://localhost:3000/api/tenant/tenant-application-form/post", formInfo)
            .subscribe(response => {
                console.log(response)
            })
    }

    getTenantAppForm() {
        this.http.get<{ TenantAppForm: any }>("http://localhost:3000/api/tenant/tenant-application-form/get")
            .subscribe(response => {
                this.formInfo = response.TenantAppForm;
                this.infoUpdated.next([...this.formInfo]);
                
            })
    }

    getInfoUpdateListener() {
        return this.infoUpdated.asObservable();
    }

}