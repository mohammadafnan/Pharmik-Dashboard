import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Editor } from 'ngx-editor';

@Component({
  selector: 'app-faqs',
  templateUrl: './faqs.component.html',
  styleUrls: ['./faqs.component.scss']
})
export class FaqsComponent implements OnInit {
  editor1: Editor;
  editor2: Editor;

  constructor(private modalService: NgbModal) { }

  ngOnInit(): void {
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
}
