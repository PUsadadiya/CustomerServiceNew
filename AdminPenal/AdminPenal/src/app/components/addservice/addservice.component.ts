import { ServiceInfo } from './../../models/serviceinfo';

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EndpointService } from 'src/app/services/endpoint.service';
import { Router, ActivatedRoute } from '@angular/router';
import { CategoryInfo } from 'src/app/models/categoryinfo';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-addservice',
  templateUrl: './addservice.component.html',
  styleUrls: ['./addservice.component.css']
})
export class AddserviceComponent implements OnInit {
  public addservice: FormGroup;
  myobj: any;
  public imagePath;
  public imgURL: any;
  fileToUpload: File;
  public message: string;
  // tslint:disable-next-line:max-line-length
  constructor( private httpClient:HttpClient,private formBuilder: FormBuilder, private route: ActivatedRoute, private endpointService: EndpointService, private router: Router) {
  }
  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.myobj = JSON.parse(params["cid"]);
      this.addservice = this.formBuilder.group({
        cid: ['', Validators.required],
        image: ['', Validators.required],
        service: ['', Validators.required]
      });
    });
    this.addservice.controls['cid'].patchValue(this.myobj);
  }
  preview(files) {
    debugger;
    if (files.length === 0) {
      return;
    }
    this.fileToUpload = files.item(0);
    let reader = new FileReader();
    this.imagePath = files;
    reader.readAsDataURL(files[0]);
    reader.onload = (event: any) => {
      // this.addcategory.get('image').setValue(event.target.files[0]);
      this.imgURL = event.target.result;
      // reader.readAsDataURL(event.target.files[0]);
    }

  }
  AddService(): void {
    // this.submitted = true;
    // this.route.queryParams.subscribe(params => {
    // this.myobj = JSON.parse(params["cid"]);
    // console.log(this.myobj);
    // this.endpointService.AddService(this.addservice.value.cid, this.addservice.value.image, this.addservice.value.service)
    //   .subscribe(data => {
    //     this.router.navigate(['list-service']);
    //     console.log(data);
    //   });
    let formData = new FormData();
    formData.append('cid',this.addservice.value.cid);
    formData.append('image', this.fileToUpload, this.fileToUpload.name);
    formData.append('service', this.fileToUpload.name);
    console.log(formData);
    this.httpClient
      .post('http://192.168.32.56:1337/service/upload', formData).subscribe(data => {
        console.log(data);
        this.router.navigate(['list-service']);
      });
}
}
