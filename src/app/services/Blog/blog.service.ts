import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class BlogService {

    allBlogsData: any[];
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

    LoadAllBlogs() {
        this._http.get<any>(environment.apiPath + 'blogs').subscribe(
            (data) => {
                this.allBlogsData = data
            },
            (err) => {
                console.log(err)
            }, () => {
            }
        )
    }

    getAllBlogs() {
        if (this.allBlogsData != undefined || this.allBlogsData != null) {
            return this.allBlogsData
        }
        else {
            this.LoadAllBlogs();
        }
    }

    postBlogs(blogObject) {
        return this._http.post<any>(environment.apiPath + 'blogs', blogObject, { headers: this.httpOptions })
    }

    updateCart(BlogObject, id) {
        return this._http.put<any>(environment.apiPath + 'blogs/' + id, BlogObject, { headers: this.httpOptions })
    }

    deleteBlog(id) {
        return this._http.delete<any>(environment.apiPath + 'blogs/' + id, { headers: this.httpOptions })
    }
}
