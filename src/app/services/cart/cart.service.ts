import { Injectable } from '@angular/core';
import { Cart } from 'src/app/Models/Cart/Cart-Model';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  allCartsData: Cart[];

  constructor(public _http: HttpClient) { }

  LoadAllCarts() {
    this._http.get<any>(environment.apiPath + 'carts').subscribe(
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

  updateCart(CartObject,id) {
    return this._http.put<any>(environment.apiPath + 'carts/'+id, CartObject)
  }
}
