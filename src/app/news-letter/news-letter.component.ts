import { Component, OnInit } from '@angular/core';
import { NewsLetterService } from '../Services/NewsLetter/news-letter.service';
import { GlobalService } from '../Services/Global/global.service';

@Component({
  selector: 'app-news-letter',
  templateUrl: './news-letter.component.html',
  styleUrls: ['./news-letter.component.scss']
})
export class NewsLetterComponent implements OnInit {

  constructor(
    public _NewsLetterService: NewsLetterService,
    public globalService: GlobalService
  ) { }

  ngOnInit(): void {
    this.globalService.checkIsUserAuthenticated();
    this._NewsLetterService.LoadAllnewsLetterEmail();
  }

  deleteUserEmail(userEmailObject) {
    this._NewsLetterService.deleteNewsLetterEmail(userEmailObject.id).subscribe(
      data => {
        this.globalService.openPopup(
          "Success",
          "Email Deleted Successfully !"
        )
      }, err => {
        if (err.status == 401) {
          this.globalService.openPopup(
            "Error",
            "Token Expire ! Please Login Again"
          )
        }
        else {
          this.globalService.openPopup(
            "Error",
            "Email Deletion Failed ! , " + err.statusText
          )
        }
      }, () => {
        this._NewsLetterService.LoadAllnewsLetterEmail()
      }
    )
  }

}
