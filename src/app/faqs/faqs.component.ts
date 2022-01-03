import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Editor } from 'ngx-editor';
import { FAQ } from '../Models/FAQ/FAQ-Model';
import { FaqsService } from '../Services/faqs/faqs.service';
import { GlobalService } from '../Services/Global/global.service';

@Component({
  selector: 'app-faqs',
  templateUrl: './faqs.component.html',
  styleUrls: ['./faqs.component.scss']
})
export class FaqsComponent implements OnInit {
  editor1: Editor;
  editor2: Editor;
  newFAQ: FAQ = {};

  constructor(
    private modalService: NgbModal,
    public _FAQsService: FaqsService,
    public globalService: GlobalService
  ) { }

  ngOnInit(): void {
    this.globalService.checkIsUserAuthenticated();
    this._FAQsService.getAllFAQs();
    this.editor1 = new Editor();
    this.editor2 = new Editor();

  }
  // make sure to destory the editor
  ngOnDestroy(): void {
    if (this.editor1 != null || this.editor1 != undefined) {
      this.editor1.destroy();
      this.editor2.destroy();
    }
  }

  openModal(exampleModalContent) {
    this.modalService.open(exampleModalContent, { size: 'lg' });
  }

  name = 'Angular 4';
  url: any;
  onSelectFile(event) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();

      reader.readAsDataURL(event.target.files[0]);

      reader.onload = (event) => {
        this.url = event.target.result;
      }
    }
  }
  public delete() {
    this.url = '';
  }

  onSaveFAQ(faq?) {
    if (faq == undefined || faq == null) {
      console.log(this.newFAQ)
      this._FAQsService.postFAQ(this.newFAQ).subscribe(
        (data) => {
          console.log(data)
          this.globalService.openPopup(
            "Success",
            "FAQ Created Successfully !"
          )
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
              "FAQ Creation Failed ! , " + err.statusText
            )
          }
        }, () => {
          this._FAQsService.LoadAllFAQs();
        }
      )
    }
    else {
      this.globalService.openPopup(
        "Error",
        "Please Fill FAQ Form Correctly!"
      )
    }
  }

  deleteFAQ(id) {
    this._FAQsService.deleteFAQ(id).subscribe(
      data => {
        this.globalService.openPopup(
          "Success",
          "FAQ Deleted Successfully !"
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
            "FAQ Deletion Failed ! , " + err.statusText
          )
        }
      }, () => {
        this._FAQsService.LoadAllFAQs();
      }
    )
  }
}
