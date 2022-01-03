import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Editor } from 'ngx-editor';
import { GlobalService } from '../Services/Global/global.service';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.scss']
})
export class PagesComponent implements OnInit {
  editor: Editor;

  constructor(
    private modalService: NgbModal,
    public globalService: GlobalService
  ) { }
  ngOnInit(): void {
    this.globalService.checkIsUserAuthenticated();
    this.editor = new Editor();

  }
  // make sure to destory the editor
  ngOnDestroy(): void {
    if (this.editor != null || this.editor != undefined) {
      this.editor.destroy();
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

      reader.readAsDataURL(event.target.files[0]); // read file as data url

      reader.onload = (event) => { // called once readAsDataURL is completed
        this.url = event.target.result;
      }
    }
  }
  public delete() {
    this.url = '';
  }

  openSuccess() {
    this.globalService.showError = true;
  }
}
