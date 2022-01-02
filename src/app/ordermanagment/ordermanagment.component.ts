import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Editor } from 'ngx-editor';
import { CheckoutService } from '../Services/Checkout/checkout.service';
import { CartService } from '../Services/Cart/cart.service';

@Component({
  selector: 'app-ordermanagment',
  templateUrl: './ordermanagment.component.html',
  styleUrls: ['./ordermanagment.component.scss']
})
export class OrdermanagmentComponent implements OnInit {
  editor: Editor;
  currentCheckout: any = {};
  currentCart: any = {};
  activeOrders: any = 0;
  deliverCharges: any = 10;
  taxPercent: any = 0.17;
  name = 'Angular 12';
  url: any;

  constructor(
    private modalService: NgbModal,
    public _CheckoutService: CheckoutService,
    public _CartService: CartService
  ) { }

  ngOnInit(): void {
    this.editor = new Editor();
    this._CheckoutService.getAllCheckouts();
    this._CartService.getAllCarts();
  }
  // make sure to destory the editor
  ngOnDestroy(): void {
    this.editor.destroy();
  }

  openModal(exampleModalContent, cart) {
    this.modalService.open(exampleModalContent, { size: 'lg' });
    this.currentCart = cart;
    console.log("Current Cart :", cart)
    this.currentCheckout = this._CheckoutService.allCheckoutsData.filter(x => x.uniqueOrderNumber == this.currentCart.uniqueOrderNumber)[0];
    console.log("Current Checkout :", this.currentCheckout)
  }

  onSelectFile(event) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = (event) => {
        this.url = event.target.result;
      }
    }
  }
  public delete() {
    this.url = '';
  }

  calculateChartsData() {
    this.activeOrders = this._CartService.allCartsData.filter(x => x.orderStatus).length;
  }

  updateStatus(cartObject, cartStatus) {

    var updateStatusObject = {
      orderStatus: cartStatus
    }
    console.log(updateStatusObject)

    this._CartService.updateCart(updateStatusObject, cartObject.id).subscribe(
      (data) => {
        console.log("Updated Cart Order Status:", data.orderStatus)
      },
      (err) => {
        console.log(err)
      }, () => {
        this._CartService.LoadAllCarts();
      }
    )
  }

  calculateTotalBill() {
    var totalBill = 0;
    for (var i = 0; i < this.currentCart.items.length; i++) {
      totalBill = totalBill + (Number(this.currentCart.items[i].price) * Number(this.currentCart.items[i].quantity))
    }
    totalBill = totalBill * (this.taxPercent + 1);
    totalBill = totalBill + this.deliverCharges
    return totalBill.toFixed(2);
  }

}
