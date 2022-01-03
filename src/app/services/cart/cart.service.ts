import { Injectable } from '@angular/core';
import { Cart } from 'src/app/Models/Cart/Cart-Model';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class CartService {

  allCartsData: Cart[];
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

  LoadAllCarts() {
    this._http.get<any>(environment.apiPath + 'carts',{headers:this.httpOptions}).subscribe(
      (data) => {
        this.allCartsData = data
      },
      (err) => {
        console.log(err)
      }, () => {
      }
    )
  }

  getAllCarts() {
    if (this.allCartsData != undefined || this.allCartsData != null) {
      return this.allCartsData
    }
    else {
      this.LoadAllCarts();
    }
  }

  updateCart(CartObject, id) {
    return this._http.put<any>(environment.apiPath + 'carts/' + id, CartObject,{headers:this.httpOptions})
  }
}
