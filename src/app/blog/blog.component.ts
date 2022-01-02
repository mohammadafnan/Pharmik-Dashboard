import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Editor, Toolbar, toDoc } from 'ngx-editor';
import { FormBuilder, FormControl, FormGroupDirective, NgForm, Validators, FormGroup } from '@angular/forms';
import { BlogService } from '../Services/Blog/blog.service';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent implements OnInit {

  name = 'Angular 12';
  url: any;
  editor: Editor;
  htmlContent: any = "";
  toolbar: Toolbar = [
    ["bold", "italic"],
    ["underline", "strike"],
    ["code", "blockquote"],
    ["ordered_list", "bullet_list"],
    [{ heading: ["h1", "h2", "h3", "h4", "h5", "h6"] }],
    ["link", "image"],
    ["text_color", "background_color"],
    ["align_left", "align_center", "align_right", "align_justify"]
  ];
  blogData: any;
  blogObject: any;
  blogForm: FormGroup = this.fb.group({
    name: ['', Validators.required],
    keyword: ['', Validators.required],
    pageDescription: ['', Validators.required],
    pageTitle: ['', Validators.required],
    urlParameter: ['', Validators.required],
    bannerImageURL: ['', Validators.required],
    writer: ['', Validators.required],
    date: ['', Validators.required],
    heading: ['', Validators.required],
    content: ['', Validators.required],
    comment: null,
  })

  constructor(
    private modalService: NgbModal,
    public fb: FormBuilder,
    public _BlogService: BlogService
  ) { }

  ngOnInit(): void {
    this.editor = new Editor();
    this._BlogService.getAllBlogs();
    setTimeout(() => {
      this.setKeywordsInBlogData();
    }, 2000);

    this.blogObject = {
      name: null,
      keyword: null,
      pageDescription: null,
      pageTitle: null,
      urlParameter: null,
      bannerImageURL: null,
      writer: null,
      date: null,
      heading: null,
      content: null,
      comment: null,
    }

  }

  ngOnDestroy(): void {
    this.editor.destroy();
  }

  openModal(exampleModalContent) {
    this.modalService.open(exampleModalContent, { size: 'lg' });
  }

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

  loadImage(event: Event) {
    console.log(event.target)
    let googleDriveImageURL = "https://drive.google.com/uc?id=";
    googleDriveImageURL = googleDriveImageURL + this.blogForm.get("bannerImageURL").value;
    this.url = googleDriveImageURL
    console.log(googleDriveImageURL)
  }

  saveBlog() {
    this.blogObject.content = "<div class='blogContainer' >" + this.htmlContent + "</div>"
    this.blogObject.bannerImageURL = this.url
    this.blogObject.date = new Date();
    this.blogObject.writer = "Admin"
    console.log("HTML Content : ", this.htmlContent)
    console.log("Blog Object : ", this.blogObject)

    this._BlogService.postBlogs(this.blogObject)
  }

  setKeywordsInBlogData() {
    console.log("Blog Properties")
    var keywordArray = [];
    const re = /\s*(?:;|$)\s*/
    this.blogData = this._BlogService.allBlogsData
    console.log("BlogData #458487 :", this.blogData)
    for (var i = 0; i < this.blogData.length; i++) {
      keywordArray = [];
      console.log(this.blogData[i])
      keywordArray = this.blogData[i].keyword.split(re)
      this.blogData[i].keyword = keywordArray;
      console.log("Blog With Keyword Array : ", this.blogData[i])
    }
  }

  deleteBlog(blogObject) {
    this._BlogService.deleteBlog(blogObject.id).subscribe(
      data => {
        console.log("Blog Deleted Successfully")
      }, err => {
        console.log(err)
      }, () => {
      }
    )
  }

}
