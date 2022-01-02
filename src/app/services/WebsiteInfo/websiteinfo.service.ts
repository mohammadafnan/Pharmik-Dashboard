import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable, throwError, from } from 'rxjs';
import { catchError, delay } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class WebsiteinfoService {

    websiteInfoData: any;

    constructor(public _http: HttpClient) { }

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

    updateWebsiteInfo(UpdatedWebsiteInfoObject:any,id) {
       return this._http.put<any>(environment.apiPath + 'webinfo/' + id, UpdatedWebsiteInfoObject)
    }
}