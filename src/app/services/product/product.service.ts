import { Injectable } from '@angular/core';
import { Product } from 'src/app/Models/Product/Product-Model';
import { HttpClient, HttpHandler, HttpHeaders } from '@angular/common/http';
import { Observable, throwError, from } from 'rxjs';
import { environment } from '../../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ProductService {

  allProductsData: Product[];

  constructor(public _http: HttpClient) { }

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
    this._http.post<Product>(environment.apiPath + 'products', faq).subscribe(
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
