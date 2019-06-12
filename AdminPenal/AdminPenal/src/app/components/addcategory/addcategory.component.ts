import { FileUploader } from 'ng2-file-upload';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EndpointService } from 'src/app/services/endpoint.service';
import { environment } from 'src/environments/environment';

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
  constructor(private httpClient: HttpClient, private formBuilder: FormBuilder, private endpointService: EndpointService, private router: Router) { }
  ngOnInit() {
    this.addcategory = this.formBuilder.group({
      image: ['', Validators.required],
      category: ['', Validators.required],

    });
  }
  preview(files) {
    if (files.length === 0) {
      return;
    }
    this.fileToUpload = files.item(0);
    let reader = new FileReader();
    this.imagePath = files;
    reader.readAsDataURL(files[0]);
    reader.onload = (event: any) => {
      this.imgURL = event.target.result;
    };
  }
  AddCategory() {
    // this.endpointService.AddCategory(this.fileToUpload, this.fileToUpload.name)
    // .subscribe(data => {
    //   this.router.navigate(['list-category']);
    //   console.log(data);
    // });
    let formData = new FormData();
    formData.append('image', this.fileToUpload);
    formData.append('category', this.addcategory.value.category);
    // this.addcategory.value.category
    this.httpClient
      .post(environment.webApiServerUrl + 'category/addcategory', formData).subscribe(data => {

        this.router.navigate(['list-category']);
      });
  }

}
