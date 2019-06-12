// import { ListServiceComponent } from './../list-service/list-service.component';
import { HttpParams, HttpClient } from '@angular/common/http';

import { CategoryInfo } from './../../models/categoryinfo';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { EndpointService } from 'src/app/services/endpoint.service';
import { first, subscribeOn } from 'rxjs/operators';
import { LocalStorage } from '@ngx-pwa/local-storage';
import { parse } from 'url';

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.css']
})
export class EditCategoryComponent implements OnInit {
  editcategory: FormGroup;
  categoryInfo: CategoryInfo;
  myobj: any;
  // tslint:disable-next-line:max-line-length
  constructor(private formBuilder: FormBuilder, private route: ActivatedRoute, private localStorage: LocalStorage, private router: Router, private endpointService: EndpointService) { }
  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.myobj = JSON.parse(params['category']);
      this.editcategory = this.formBuilder.group({
        id: [],
        type: [],
        size: [],
        category: []
      });
    });
    this.editcategory.controls['id'].patchValue(this.myobj.id);
    this.editcategory.controls['type'].patchValue(this.myobj.type);
    this.editcategory.controls['size'].patchValue(this.myobj.size);
    this.editcategory.controls['category'].patchValue(this.myobj.category);
  }
  UpdateCategory() {
    // tslint:disable-next-line:max-line-length
    this.endpointService.updateCategory(this.editcategory.value.id, this.editcategory.value.type, this.editcategory.value.size, this.editcategory.value.category)
      .subscribe(
        data => {
          this.router.navigate(['list-category']);
        },
        error => {
          alert(error);
        });
  }

}
