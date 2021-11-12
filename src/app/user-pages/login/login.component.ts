import { Component, OnInit } from '@angular/core';

import { FormGroup, FormControl, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public formdata;

  constructor(private router: Router) { }

  ngOnInit() {
    this.formdata = new FormGroup({
      // username: new FormControl("", Validators.compose([
      //   Validators.required,
      //   Validators.minLength(10)
      // ])),
      // password: new FormControl("", this.passwordvalidation)
    })


  }
  //   passwordvalidation(formcontrol) {
  //     if (formcontrol.value.length > 8) {
  //        return {"passwd" : true};
  //     }

  //  }
  onClickSubmit(data) {
    // alert("123");

    console.log(data.username);
    if (data.username == "admin" && data.password == "123") {
      alert("Login Successful");
      this.router.navigate(['dashboard'])
    } else {
      alert("Invalid Login");
      return false;
    }
  }
}
