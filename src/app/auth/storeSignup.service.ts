import { Injectable } from "@angular/core";
import { Http } from "@angular/http";
import { HttpClient } from "@angular/common/http"

import { Subject } from 'rxjs';
import { AuthSignup } from "./authSignup.model";
import { environment } from "../../environments/environment"
import { map } from 'rxjs/operators'

const BACKEND_URL = environment.apiUrl + "/screeningInfo";

 
@Injectable()
export class StoreSignup{
    private infoSentToServer: AuthSignup[] = [];
    private infoUpdated = new Subject<AuthSignup[]>()
    
    constructor(private http: Http, private httpClient: HttpClient) {}
    
    sendSignupInfoToBackend(infoSentToServer) {
        console.log(infoSentToServer)
        this.infoSentToServer.push(infoSentToServer);
        console.log(this.infoSentToServer);
        this.infoUpdated.next([...this.infoSentToServer]);
        this.http.post(BACKEND_URL, infoSentToServer)
        .subscribe((responseData) => {
            console.log(responseData);         
        })
    }   

    getInfo() {       
        this.httpClient.get<{ScreeningRequestForms: any}>(BACKEND_URL + "/getInfo")
        // .pipe(map((formData) => {
        //     return formData.ScreeningRequestForms.map(form => {
        //        return {
        //         id: form._id,
        //         applicantFirstName: form.applicantFirstName,
        //         applicantLastName: form.applicantLastName,
        //         applicantEmail: form.applicantEmail,
        //         applicantPhoneNo: form.applicantPhoneNo,
        //         screeningCost: form.screeningCost
        //        } 
        //     });
        // }))
            .subscribe((transformedData) => {
                console.log(transformedData);
                this.infoSentToServer = transformedData.ScreeningRequestForms;
                this.infoUpdated.next([...this.infoSentToServer])

            })
    }

    getInfoUpdateListener() {
       return this.infoUpdated.asObservable();
    }

}