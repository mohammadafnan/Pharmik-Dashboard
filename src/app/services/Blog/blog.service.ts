import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class BlogService {

    allBlogsData: any[];

    constructor(public _http: HttpClient) { }

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
        this._http.post<any>(environment.apiPath + 'blogs', blogObject).subscribe(
            (data) => {
                this.allBlogsData = data
            },
            (err) => {
                console.log(err)
            }, () => {
                console.log("Blog Added Successfully")
            }
        )
    }

    updateCart(BlogObject, id) {
        return this._http.put<any>(environment.apiPath + 'blogs/' + id, BlogObject)
    }

    deleteBlog(id) {
        return this._http.delete<any>(environment.apiPath + 'blogs/' + id)
    }
}
