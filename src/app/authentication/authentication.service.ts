import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { AuthData } from "./auth-data.model";
import { Subject } from "rxjs";

@Injectable()
export class AuthenticationService {
    private token: string;
    private authStatusListener = new Subject<boolean>();

    getToken() {
        return this.token;
    }
    
    getAuthStatusListener() {
        return this.authStatusListener.asObservable();
    }

    constructor(private http: HttpClient) {}

    createUser(email: string, password: string) {
        const authData: AuthData = {
            email: email,
            password: password
        };
        this.http.post("http://localhost:3000/api/user/signup", authData)
            .subscribe((response) => {
                console.log(response)
            })
    }

    login(email: string, password: string) {
        const authData: AuthData = {
            email: email,
            password: password
        };
        this.http.post<{token: string}>("http://localhost:3000/api/user/signin", authData)
        .subscribe((response) => {
            const token = response.token
            this.token = token;
            this.authStatusListener.next(true); // if login is succes, then Display logout buton and remove Login/Signup button
        })

    }
}