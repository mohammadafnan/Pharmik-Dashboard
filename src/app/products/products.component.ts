import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Editor } from 'ngx-editor';
import { Product } from '../Models/Product/Product-Model';
import { ProductService } from '../Services/product/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  editor: Editor;

  constructor(private modalService: NgbModal, public _ProductService: ProductService) { }

  ngOnInit(): void {
    this._ProductService.LoadAllProducts();
    setTimeout(() => {
      console.log(this._ProductService.allProductsData)
    }, 3000);
    this.editor = new Editor();

  }
  // make sure to destory the editor
  ngOnDestroy(): void {
    this.editor.destroy();
  }

  openModal(exampleModalContent) {
    this.modalService.open(exampleModalContent, { size: 'lg' });
  }

  name = 'Angular 4';
  url: any;
  onSelectFile(event) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();

      reader.readAsDataURL(event.target.files[0]); // read file as data url

      reader.onload = (event) => { // called once readAsDataURL is completed
        this.url = event.target.result;
      }
    }
  }
  public delete() {
    this.url = '';
  }

}
