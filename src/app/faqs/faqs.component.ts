import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Editor } from 'ngx-editor';
import { FAQ } from '../Models/FAQ/FAQ-Model';
import { FaqsService } from '../Services/faqs/faqs.service';

@Component({
  selector: 'app-faqs',
  templateUrl: './faqs.component.html',
  styleUrls: ['./faqs.component.scss']
})
export class FaqsComponent implements OnInit {
  editor1: Editor;
  editor2: Editor;
  newFAQ: FAQ = {};

  constructor(private modalService: NgbModal, public _FAQsService: FaqsService) { }

  ngOnInit(): void {
    this._FAQsService.getAllFAQs();
    this.editor1 = new Editor();
    this.editor2 = new Editor();

  }
  // make sure to destory the editor
  ngOnDestroy(): void {
    this.editor1.destroy();
    this.editor2.destroy();

  }

  openModal(exampleModalContent) {
    this.modalService.open(exampleModalContent, { size: 'lg' });
  }

  name = 'Angular 4';
  url: any;
  onSelectFile(event) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();

      reader.readAsDataURL(event.target.files[0]); // read file as data url

      reader.onload = (event) => { // called once readAsDataURL is completed
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
      this._FAQsService.postFAQ(this.newFAQ);
    }
    else {
      // this._FAQsService
    }
  }
}
