import { Component, OnInit } from '@angular/core';
import { GlobalService } from '../Services/Global/global.service';
import { WebsiteinfoService } from '../Services/WebsiteInfo/websiteinfo.service';

@Component({
  selector: 'app-webinfo',
  templateUrl: './webinfo.component.html',
  styleUrls: ['./webinfo.component.scss']
})
export class WebinfoComponent implements OnInit {

  constructor(
    public globalService: GlobalService,
    public _WebsiteInfoService: WebsiteinfoService
  ) { }

  ngOnInit(): void {
    this.globalService.checkIsUserAuthenticated();
    this._WebsiteInfoService.LoadWebsiteInfo();
  }

  updateWebInfo(webInfoObject) {
    this._WebsiteInfoService.updateWebsiteInfo(webInfoObject, webInfoObject.id).subscribe(
      (data) => {
        alert("Website Info")
      },
      (err) => {
        console.log(err)
        if (err.status == 401) {
          this.globalService.openPopup(
            "Error",
            "Token Expire ! Please Login Again"
          )
        }
        else {
          this.globalService.openPopup(
            "Error",
            "Website Information Update Failed !"
          )
        }
      }, () => {
      }
    )
  }
}
