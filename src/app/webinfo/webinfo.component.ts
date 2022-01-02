import { Component, OnInit } from '@angular/core';
import { WebsiteinfoService } from '../Services/WebsiteInfo/websiteinfo.service';

@Component({
  selector: 'app-webinfo',
  templateUrl: './webinfo.component.html',
  styleUrls: ['./webinfo.component.scss']
})
export class WebinfoComponent implements OnInit {

  constructor(
    public _WebsiteInfoService: WebsiteinfoService
  ) { }

  ngOnInit(): void {
    this._WebsiteInfoService.LoadWebsiteInfo
  }

  updateWebInfo(webInfoObject) {
    this._WebsiteInfoService.updateWebsiteInfo(webInfoObject, webInfoObject.id).subscribe(
      (data) => {
        alert("Website Info")
      },
      (err) => {
        console.log(err)
      }, () => {
      }
    )
  }
}
