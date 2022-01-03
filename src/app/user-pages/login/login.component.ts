import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/Services/Auth/auth.service';
import { FormBuilder, FormGroup, FormControl, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { GlobalService } from 'src/app/Services/Global/global.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public userdata: FormGroup;
  username: string = "";
  password: string = "";


  constructor(
    private router: Router,
    public fb: FormBuilder,
    public _AuthenticationService: AuthService,
    public globalService: GlobalService
  ) { }

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
    var authObject = {
      name: this.username,
      password: this.password
    }
    console.log(authObject)
    if (this.username != null && this.password != null) {
      this._AuthenticationService.authenticateUser(authObject).subscribe(
        data => {
          console.log("UserData : ", data)
          localStorage.setItem("tokenInfo", JSON.stringify(data))
        }, err => {
          this.globalService.openPopup(
            "Error",
            "Cannot Authenticate User, Please Try Again"
          )
        }, () => {
          this.router.navigate(['dashboard'])
        }
      )
    }
    else {
      this.globalService.openPopup(
        "Error",
        "Invalid Login Credentials"
      )
      return false;
    }
  }
}
