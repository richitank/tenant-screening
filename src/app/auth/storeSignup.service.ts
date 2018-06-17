import { Injectable } from "@angular/core";
import { Http } from "@angular/http";
import { AuthService } from "./auth.service";
import { Subject } from 'rxjs';
import { AuthSignup } from "./authSignup.model";

@Injectable()
export class StoreSignup{
    private infoSentToServer: AuthSignup[] = [];
    private infoUpdated = new Subject<AuthSignup[]>()
    
    constructor(private http: Http, private authService: AuthService) {}
    
    
    storeInfo (form: any[]) {
        //const token = this.authService.getToken()
        const token = "F6v9gBitn3vaAThKVImTwzKJ6hR4mUXOtcrFq3wj";

        //console.log(token);
           
        return this.http.post('https://offrbox-tenant-screening.firebaseio.com/NewSignUpInfo.json?auth=' + token, form);

    }
    backend(infoSentToServer) {
        this.infoSentToServer.push(infoSentToServer);
        console.log(this.infoSentToServer);
        this.infoUpdated.next([...this.infoSentToServer]);
        this.http.post('http://localhost:3000/api/welcome', infoSentToServer)
        .subscribe((responseData) => {
            console.log(responseData);         
        })
    }

    getInfo() {
       
        return [...this.infoSentToServer];
    }

    getInfoUpdateListener() {
       return this.infoUpdated.asObservable();
    }

}