import { Injectable } from '@angular/core';
import { Checkout } from 'src/app/Models/Checkout/Checkout-Model';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError, from } from 'rxjs';
import { catchError, delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {

  allCheckoutsData: Checkout[];

  constructor(public _http: HttpClient) { }

  LoadAllCheckouts() {
    this._http.get<any>(environment.apiPath + 'checkouts').subscribe(
      (data) => {
        this.allCheckoutsData = data
      },
      (err) => {
        console.log(err)
      }, () => {
      }
    )
  }

  postCheckout(Checkout) {
    this._http.post<Checkout>(environment.apiPath + 'checkouts', Checkout).subscribe(
      (data) => {
        console.log(data)
      },
      (err) => {
        console.log(err)
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
}
