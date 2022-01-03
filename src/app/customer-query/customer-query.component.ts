import { Component, OnInit } from '@angular/core';
import { CustomerQueryService } from '../Services/CustomerQuery/customer-query.service';
import { GlobalService } from '../Services/Global/global.service';

@Component({
  selector: 'app-customer-query',
  templateUrl: './customer-query.component.html',
  styleUrls: ['./customer-query.component.scss']
})
export class CustomerQueryComponent implements OnInit {

  constructor(
    public _CustomerQueryService: CustomerQueryService,
    public globalService: GlobalService,
  ) { }

  ngOnInit(): void {
    this.globalService.checkIsUserAuthenticated();
    this._CustomerQueryService.getAllCustomerQuery();
  }

  deleteCustomerQuery(customerQueryObject) {
    this._CustomerQueryService.deleteCustomerQuery(customerQueryObject.id).subscribe(
      data => {
        console.log("Customer Query Deleted Successfully")
        this.globalService.openPopup(
          "Success",
          "Customer Query Deleted Successfully"
        )
      },
      err => {
        console.log(err)
        if (err.status == 401) {
          this.globalService.openPopup(
            "Error",
            "Token Expire ! Please Login Again"
          )
        }
        else {
          this.globalService.openPopup(
            "Error!",
            "Customer Query Deletion Failed , " + err.statusText
          )
        }
      }, () => {
        this._CustomerQueryService.LoadAllCustomerQuery();
      }
    )
  }

}
