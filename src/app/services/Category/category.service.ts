import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable, throwError, from } from 'rxjs';
import { catchError, delay } from 'rxjs/operators';
import { Category } from 'src/app/Models/Category/Category-Model';

@Injectable({
    providedIn: 'root'
})
export class CategoryService {

    allCategoryData: Category[];

    constructor(public _http: HttpClient) { }

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
        this._http.post<Category>(environment.apiPath + 'category', category).subscribe(
            (data) => {
                console.log(data)
            },
            (err) => {
                console.log(err)
            }
        )
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
