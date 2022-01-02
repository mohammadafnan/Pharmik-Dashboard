import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable, throwError, from } from 'rxjs';
import { catchError, delay } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class NewsLetterService {

    allNewsLetterEmail: any[];

    constructor(public _http: HttpClient) { }

    LoadAllnewsLetterEmail() {
        this._http.get<any>(environment.apiPath + 'newsletter').subscribe(
            (data) => {
                this.allNewsLetterEmail = data
            },
            (err) => {
                console.log(err)
            }, () => {
            }
        )
    }

    deleteNewsLetterEmail(id) {
       return this._http.delete<any>(environment.apiPath + 'newsletter/' + id)
    }
}
