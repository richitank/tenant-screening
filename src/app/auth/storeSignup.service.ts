import { Injectable } from "@angular/core";
import { Http } from "@angular/http";
import { AuthService } from "./auth.service";

@Injectable()
export class StoreSignup{
    constructor(private http: Http, private authService: AuthService) {}
    
    
    storeInfo (form: any[]) {
        //const token = this.authService.getToken()
        const token = "F6v9gBitn3vaAThKVImTwzKJ6hR4mUXOtcrFq3wj";

        //console.log(token);
           
        return this.http.post('https://offrbox-tenant-screening.firebaseio.com/NewSignUpInfo.json?auth=' + token, form);
    }
}