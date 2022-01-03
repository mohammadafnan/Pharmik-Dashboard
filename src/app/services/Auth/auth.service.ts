import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    authData: any

    constructor(
        public _http: HttpClient,
    ) { }

    authenticateUser(authObject) {
        return this._http.post<any>(environment.apiPath + 'authentication', authObject)
    }
}
