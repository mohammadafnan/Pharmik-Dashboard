import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable, throwError, from } from 'rxjs';
import { catchError, delay } from 'rxjs/operators';
import { Category } from 'src/app/Models/Category/Category-Model';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class CategoryService {

    allCategoryData: Category[];
    httpOptions: any;
    userData!:any;

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

    LoadAllCategory() {
        this._http.get<any>(environment.apiPath + 'category').subscribe(
            (data) => {
                this.allCategoryData = data
            },
            (err) => {
                console.log(err)
            }, () => {
                this.LoadAllCategory()
            }
        )
    }

    postCategory(category) {
        return this._http.post<Category>(environment.apiPath + 'category', category,{headers:this.httpOptions})
    }

    getAllCategory() {
        if (this.allCategoryData != undefined || this.allCategoryData != null) {
            return this.allCategoryData
        }
        else {
            this.LoadAllCategory();
        }
    }

}
