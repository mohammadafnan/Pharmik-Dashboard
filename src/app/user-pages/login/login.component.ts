import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, FormControl, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public userdata: FormGroup;
  username: string = "";
  password: string = "";


  constructor(private router: Router, public fb: FormBuilder,) { }

  ngOnInit() {
    this.userdata = this.fb.group({
      username: ["", Validators.required],
      password: ["", Validators.required]
    })
  }

  getUsername(e) {
    this.username = e
  }

  getPassword(e) {
    this.password = e
  }

  LogIn() {
    if (this.username == "admin" && this.password == "admin123") {
      // alert("Login Successful");
      this.router.navigate(['dashboard'])
    } else {
      alert("Invalid Login");
      return false;
    }
  }
}
