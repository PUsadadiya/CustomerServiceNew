// import { ListServiceComponent } from './../list-service/list-service.component';
import { HttpParams, HttpClient } from '@angular/common/http';

import { ServiceInfo } from './../../models/serviceinfo';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { EndpointService } from 'src/app/services/endpoint.service';
import { first, subscribeOn } from 'rxjs/operators';
import { LocalStorage } from '@ngx-pwa/local-storage';
import { parse } from 'url';

@Component({
  selector: 'app-edit-service',
  templateUrl: './edit-service.component.html',
  styleUrls: ['./edit-service.component.css']
})
export class EditServiceComponent implements OnInit {
  editservices: FormGroup;
  serviceInfo: ServiceInfo;
  myobj: any;
  // tslint:disable-next-line:max-line-length
  constructor(private formBuilder: FormBuilder, private route: ActivatedRoute, private localStorage: LocalStorage, private router: Router, private endpointService: EndpointService) { }
  ngOnInit() {
    // console.log(this.route.queryParams.value);
    this.route.queryParams.subscribe(params => {
      this.myobj = JSON.parse(params["service"]);
      console.log(this.myobj);
      console.log(this.myobj.id);
      console.log(this.myobj.image);
      this.editservices = this.formBuilder.group({
        id: [],
        image: [],
        service: []
      });
    });

    this.editservices.controls['id'].patchValue(this.myobj.id);
    this.editservices.controls['image'].patchValue(this.myobj.image);
    this.editservices.controls['service'].patchValue(this.myobj.service);
  }
  UpdateService() {
    console.log('in update id : ' + this.myobj.id);
    console.log('in update image :' + this.myobj.image);
    console.log('in update service :' + this.myobj.service);
    this.endpointService.updateService(this.editservices.value.id, this.editservices.value.image, this.editservices.value.service)
      .subscribe(
        data => {
          console.log(this.editservices.value.image);
          console.log(this.editservices.value.service);
          console.log(data);
          this.router.navigate(['list-service']);
        },
        error => {
          alert(error);
        });
  }

}
