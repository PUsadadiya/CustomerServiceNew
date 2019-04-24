import { FileUploader } from 'ng2-file-upload';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EndpointService } from 'src/app/services/endpoint.service';
// import {  FileDropDirective, FileSelectDirective } from 'ng2-file-upload';


@Component({
  selector: 'app-addcategory',
  templateUrl: './addcategory.component.html',
  styleUrls: ['./addcategory.component.css']
})
export class AddcategoryComponent implements OnInit {
  public addcategory: FormGroup;
  public imagePath;
  public imgURL: any;
  fileToUpload: File;
  public message: string;
  // tslint:disable-next-line:max-line-length
  constructor(private httpClient: HttpClient, private formBuilder: FormBuilder, private endpointService: EndpointService, private router: Router) {


  }
  ngOnInit() {
    this.addcategory = this.formBuilder.group({
      // id: [],
      image: ['', Validators.required],
      category: ['', Validators.required]
    });
  }
  preview(files) {
    // debugger;
    if (files.length === 0) {
      return;
    }
    this.fileToUpload = files.item(0);
    let reader = new FileReader();
    this.imagePath = files;
    reader.readAsDataURL(files[0]);
    reader.onload = (event: any) => {
      this.imgURL = event.target.result;
      // reader.readAsDataURL(event.target.files[0]);
    }

  }
  AddCategory() {
    // this.endpointService.AddCategory(this.fileToUpload.name, this.addcategory.value.category)
    //   .subscribe(data => {
    //     console.log(data);
    //     this.router.navigate(['list-category']);
    //   });
    // let files;
    // this.fileToUpload = files.item(0);
    // let reader = new FileReader();
    // this.imagePath = files;
    // reader.readAsDataURL(files[0]);
    let formData = new FormData();
    formData.append('image', this.fileToUpload, this.fileToUpload.name);
    formData.append('category', this.fileToUpload.name);
    console.log(formData);
    this.httpClient
      .post('http://192.168.32.56:1337/category/upload', formData).subscribe(data => {
        console.log(data);
        this.router.navigate(['list-category']);
      });
  }

}
