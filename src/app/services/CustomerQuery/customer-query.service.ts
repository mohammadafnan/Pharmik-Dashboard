import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable, throwError, from } from 'rxjs';
import { catchError, delay } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class CustomerQueryService {

    allCustomerQueryData: any;
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

    LoadAllCustomerQuery() {
        this._http.get<any>(environment.apiPath + 'query', { headers: this.httpOptions }).subscribe(
            (data) => {
                this.allCustomerQueryData = data
            },
            (err) => {
                console.log(err)
            }, () => {
            }
        )
    }

    getAllCustomerQuery() {
        if (this.allCustomerQueryData == undefined || this.allCustomerQueryData == null) {
            this.LoadAllCustomerQuery()
        }
        else {
            return this.allCustomerQueryData
        }
    }

    deleteCustomerQuery(id) {
        return this._http.delete<any>(environment.apiPath + 'query/' + id, { headers: this.httpOptions })
    }
}
