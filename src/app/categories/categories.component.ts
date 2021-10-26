import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Editor } from 'ngx-editor';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {
  editor: Editor;

  constructor(private modalService: NgbModal) { }

  ngOnInit(): void {
    this.editor = new Editor();

  }
  // make sure to destory the editor
  ngOnDestroy(): void {
    this.editor.destroy();
  }

  openModal( exampleModalContent ) {
    this.modalService.open( exampleModalContent, { size : 'lg' } );
  }
}
