import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable, throwError, from } from 'rxjs';
import { catchError, delay } from 'rxjs/operators';
import { FAQ } from 'src/app/Models/FAQ/FAQ-Model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class FaqsService {

  allFAQsData: FAQ[];
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

  LoadAllFAQs() {
    this._http.get<any>(environment.apiPath + 'faqs').subscribe(
      (data) => {
        this.allFAQsData = data
      },
      (err) => {
        console.log(err)
      }, () => {
      }
    )
  }

  postFAQ(faq) {
    return this._http.post<FAQ>(environment.apiPath + 'faqs', faq, { headers: this.httpOptions })
  }

  getAllFAQs() {
    if (this.allFAQsData != undefined || this.allFAQsData != null) {
      return this.allFAQsData
    }
    else {
      this.LoadAllFAQs();
    }
  }

  deleteFAQ(id) {
    return this._http.delete<any>(environment.apiPath + 'faqs/' + id, { headers: this.httpOptions })
  }

}
