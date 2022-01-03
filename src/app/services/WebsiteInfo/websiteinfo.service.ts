import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable, throwError, from } from 'rxjs';
import { catchError, delay } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class WebsiteinfoService {

    websiteInfoData: any;
    httpOptions: any;
    userData!: any;
    constructor(public _http: HttpClient, public router: Router) {
        this.userData = localStorage.getItem('tokenInfo')
        if (this.userData == null || this.userData == undefined) {
            this.router.navigate(["/"])
        }
        else {
            this.httpOptions = new HttpHeaders({
                'x-access-token': JSON.parse(this.userData).token,
                'Content-type': 'application/json',
            })
        }
    }
    LoadWebsiteInfo() {
        this._http.get<any>(environment.apiPath + 'webinfo').subscribe(
            (data) => {
                this.websiteInfoData = data
            },
            (err) => {
                console.log(err)
            }, () => {
            }
        )
    }

    updateWebsiteInfo(UpdatedWebsiteInfoObject: any, id) {
        return this._http.put<any>(environment.apiPath + 'webinfo/' + id, UpdatedWebsiteInfoObject, { headers: this.httpOptions })
    }
}