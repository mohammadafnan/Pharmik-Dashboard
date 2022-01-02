import { Component, OnInit } from '@angular/core';
import { CustomerQueryService } from '../Services/CustomerQuery/customer-query.service';

@Component({
  selector: 'app-customer-query',
  templateUrl: './customer-query.component.html',
  styleUrls: ['./customer-query.component.scss']
})
export class CustomerQueryComponent implements OnInit {

  constructor(
    public _CustomerQueryService: CustomerQueryService
  ) { }

  ngOnInit(): void {
    this._CustomerQueryService.getAllCustomerQuery();
  }

  deleteCustomerQuery(customerQueryObject) {
    this._CustomerQueryService.deleteCustomerQuery(customerQueryObject.id).subscribe(
      data => {
        console.log("Customer Query Deleted Successfully")
      },
      err => {
        console.log(err)
      }
    )
  }

}
