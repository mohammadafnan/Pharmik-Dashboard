import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class GlobalService {

    errorMessage: any = "Success Message";
    errorTitle: any = "Success";
    showError: boolean = false;
    isUserAuthenticated: boolean = false;

    constructor(public _http: HttpClient, public router: Router) { }

    openPopup(title: string, message: string) {
        this.errorTitle = title;
        this.errorMessage = message;
        this.showError = true;
    }

    checkIsUserAuthenticated() {
        var tokenInfo = JSON.parse(localStorage.getItem("tokenInfo"));
        if (tokenInfo == null || tokenInfo == undefined || tokenInfo.token == null || tokenInfo.token == undefined) {
            this.isUserAuthenticated = false;
            this.router.navigate(['/'])
            this.openPopup(
                "Error",
                "Token Not Found ! Please Login Again"
                )
        }
        else {
            this.isUserAuthenticated = true;
        }
    }
}
