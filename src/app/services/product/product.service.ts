import { Injectable } from '@angular/core';
import { Product } from 'src/app/Models/Product/Product-Model';
import { HttpClient, HttpHandler, HttpHeaders } from '@angular/common/http';
import { Observable, throwError, from } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class ProductService {

  allProductsData: Product[];
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

  LoadAllProducts() {
    this._http.get<any>(environment.apiPath + 'products').subscribe(
      (data) => {
        this.allProductsData = data
      },
      (err) => {
        console.log(err)
      }, () => {
      }
    )
  }

  postFAQ(faq) {
    this._http.post<Product>(environment.apiPath + 'products', faq,{headers:this.httpOptions}).subscribe(
      (data) => {
        console.log(data)
      },
      (err) => {
        console.log(err)
      }
    )
  }

  getAllProducts() {
    if (this.allProductsData != undefined || this.allProductsData != null) {
      return this.allProductsData
    }
    else {
      this.LoadAllProducts();
    }
  }

}
