import { Component, OnInit } from '@angular/core';
import { NewsLetterService } from '../Services/NewsLetter/news-letter.service';

@Component({
  selector: 'app-news-letter',
  templateUrl: './news-letter.component.html',
  styleUrls: ['./news-letter.component.scss']
})
export class NewsLetterComponent implements OnInit {

  constructor(
    public _NewsLetterService: NewsLetterService
  ) { }

  ngOnInit(): void {
    this._NewsLetterService.LoadAllnewsLetterEmail()
  }

  deleteUserEmail(userEmailObject) {
    this._NewsLetterService.deleteNewsLetterEmail(userEmailObject.id).subscribe(
      (data) => {
        alert("NewsLetter Deleted Successfully")
      },
      (err) => {
        console.log(err)
      }, () => {
      }
    )
  }

}
