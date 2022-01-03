import { Injectable } from '@angular/core';
import { Checkout } from 'src/app/Models/Checkout/Checkout-Model';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError, from } from 'rxjs';
import { catchError, delay } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {

  allCheckoutsData: Checkout[];
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

  LoadAllCheckouts() {
    this._http.get<any>(environment.apiPath + 'checkouts',{headers:this.httpOptions}).subscribe(
      (data) => {
        this.allCheckoutsData = data
      },
      (err) => {
        console.log(err)
      }, () => {
      }
    )
  }

  getAllCheckouts() {
    if (this.allCheckoutsData != undefined || this.allCheckoutsData != null) {
      return this.allCheckoutsData
    }
    else {
      this.LoadAllCheckouts();
    }
  }

  updateOrderStatus(obj) {
    return this._http.put<any>(environment.apiPath + 'checkouts', obj,{headers:this.httpOptions})
  }

}
