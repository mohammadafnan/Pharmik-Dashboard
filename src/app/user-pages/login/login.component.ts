import { Component, OnInit } from '@angular/core';

import {FormBuilder, FormGroup, FormControl, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public formdata:FormGroup;

  constructor(private router: Router,  public form: FormBuilder,) { }

  ngOnInit() {
    this.formdata = new FormGroup({
      username: new FormControl("", Validators.compose([
        Validators.required,
        Validators.minLength(10)
      ])),
      password: new FormControl("", this.passwordvalidation)
    })


  }
    passwordvalidation(formcontrol) {
      if (formcontrol.value.length > 8) {
         return {"passwd" : true};
      }

   }
  onClickSubmit(data) {
    // alert("1");

    console.log(data.username);
    // alert("2");

    if (data.username == "" && data.password == "") {
      alert("Login Successful");
      // alert("3");

      this.router.navigate(['dashboard'])
    } else {
      alert("Invalid Login");
      return false;
    }
  }
}
