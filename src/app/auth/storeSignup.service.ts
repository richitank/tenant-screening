import { Injectable } from "@angular/core";
import { Http } from "@angular/http";
import { HttpClient } from "@angular/common/http"

import { AuthService } from "./auth.service";
import { Subject } from 'rxjs';
import { AuthSignup } from "./authSignup.model";

import { map } from 'rxjs/operators'

@Injectable()
export class StoreSignup{
    private infoSentToServer: AuthSignup[] = [];
    private infoUpdated = new Subject<AuthSignup[]>()
    
    constructor(private http: Http, private authService: AuthService, private httpClient: HttpClient) {}
    
    
    storeInfo (form: any[]) {
        //const token = this.authService.getToken()
        const token = "F6v9gBitn3vaAThKVImTwzKJ6hR4mUXOtcrFq3wj";

        //console.log(token);
           
        return this.http.post('https://offrbox-tenant-screening.firebaseio.com/NewSignUpInfo.json?auth=' + token, form);

    }
    sendSignupInfoToBackend(infoSentToServer) {
        this.infoSentToServer.push(infoSentToServer);
        console.log(this.infoSentToServer);
        this.infoUpdated.next([...this.infoSentToServer]);
        this.http.post('http://localhost:3000/api/welcome', infoSentToServer)
        .subscribe((responseData) => {
            console.log(responseData);         
        })
    }

    getInfo() {
       
        this.httpClient.get<{ScreeningRequestForms: AuthSignup[]}>('http://localhost:3000/api/welcome')
            .subscribe((data) => {
                this.infoSentToServer = data.ScreeningRequestForms;
                this.infoUpdated.next([...this.infoSentToServer])

            })
    }

    getInfoUpdateListener() {
       return this.infoUpdated.asObservable();
    }

}