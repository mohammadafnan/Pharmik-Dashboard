import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Editor } from 'ngx-editor';
import { Category } from '../Models/Category/Category-Model';
import { CategoryService } from '../Services/Category/category.service';
import { FormBuilder, FormControl, FormGroupDirective, NgForm, Validators, FormGroup } from '@angular/forms';
import { GlobalService } from '../Services/Global/global.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {
  editor: Editor;
  categoryHTMLContent: any = "";
  name = 'Angular 4';
  url: any;
  categoryObject: Category;
  categoryForm: FormGroup = this.fb.group({
    categoryName: ['', Validators.required],
    routeURL: ['', Validators.required],
    imageURL: ['', Validators.required],
    pageTitle: ['', Validators.required],
    pageDescription: ['', Validators.required],
    pageKeyword: ['', Validators.required],
  })

  constructor(
    private modalService: NgbModal,
    private fb: FormBuilder,
    public _CategoryService: CategoryService,
    public globalService: GlobalService,
    public router:Router
  ) { }

  ngOnInit(): void {
    this.globalService.checkIsUserAuthenticated();
    this.editor = new Editor();

    this.categoryObject = {
      categoryName: null,
      routeURL: null,
      imageURL: null,
      showInSideMenu: null,
      pageTitle: null,
      pageDescription: null,
      pageKeyword: null,
      pageContent: null,
    }

    this._CategoryService.getAllCategory()
  }
  // make sure to destory the editor
  ngOnDestroy(): void {
    if (this.editor != null || this.editor != undefined) {
      this.editor.destroy();
    }
  }

  loadImage(event: Event) {
    console.log(event.target)
    let googleDriveImageURL = "https://drive.google.com/uc?id=";
    googleDriveImageURL = googleDriveImageURL + this.categoryForm.get("imageURL").value;
    this.url = googleDriveImageURL
    console.log(googleDriveImageURL)
  }

  showHTMLtext() {
    console.log("Category Object : ", this.categoryForm)
    console.log("HTML Content : ", this.categoryHTMLContent)
  }

  openModal(exampleModalContent) {
    this.modalService.open(exampleModalContent, { size: 'lg' });
  }

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

  onSave() {
    this.categoryObject.categoryName = this.categoryForm.get("categoryName").value;
    this.categoryObject.routeURL = this.categoryForm.get("routeURL").value;
    this.categoryObject.imageURL = "https://drive.google.com/uc?id=" + this.categoryForm.get("imageURL").value;
    this.categoryObject.showInSideMenu = true;
    this.categoryObject.pageTitle = this.categoryForm.get("pageTitle").value;
    this.categoryObject.pageDescription = this.categoryForm.get("pageDescription").value;
    this.categoryObject.pageKeyword = this.categoryForm.get("pageKeyword").value;
    this.categoryObject.pageContent = this.categoryHTMLContent;

    console.log("Category Object : ", this.categoryObject)

    this._CategoryService.postCategory(this.categoryObject).subscribe(
      (data) => {
        console.log(data)
        this.globalService.openPopup(
          "Success",
          "Category Created Successfully"
        )
      },
      (err) => {
        console.log(err)
        if(err.status == 401){
          this.globalService.openPopup(
            "Error",
            "Token Expire ! Please Login Again"
          )
        }
        else{
          this.globalService.openPopup(
            "Error",
            "Category Creation Failed , " + err.statusText
          )
        }
      },()=>{
        this._CategoryService.LoadAllCategory();
      }
    )
  }
}
