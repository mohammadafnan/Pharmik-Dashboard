import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable, throwError, from } from 'rxjs';
import { catchError, delay } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class CustomerQueryService {

    allCustomerQueryData: any = []

    constructor(public _http: HttpClient) { }

    LoadAllCustomerQuery() {
        this._http.get<any>(environment.apiPath + 'query').subscribe(
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
        return this._http.delete<any>(environment.apiPath + 'query/' + id)
    }
}
