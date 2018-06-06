import { Injectable } from "@angular/core";
import { Http } from "@angular/http";
import { HttpClient } from "@angular/common/http";

@Injectable()
export class Mailer {
    constructor(private http: HttpClient) {}

    sendMail(applicantEmail){
        this.http.post<{message: string}>('http://localhost:3000/api/welcome', applicantEmail)
            .subscribe((responseData) => {
                console.log(responseData.message);
            })
    }

    
   
}