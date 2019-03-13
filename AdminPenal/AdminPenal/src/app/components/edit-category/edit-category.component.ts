import { CategoryInfo } from './../../models/categoryinfo';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, NgForm, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LocalStorage } from '@ngx-pwa/local-storage';
import { EndpointService } from 'src/app/services/endpoint.service';


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
      this.myobj = JSON.parse(params["category"]);
      console.log(this.myobj);
      console.log(this.myobj.sid);
      console.log(this.myobj.image);
      this.editcategory = this.formBuilder.group({
        id: [],
        sid: [],
        image: [],
        category: []
      });
    });
    this.editcategory.controls['id'].patchValue(this.myobj.id);
    this.editcategory.controls['sid'].patchValue(this.myobj.sid);
    this.editcategory.controls['image'].patchValue(this.myobj.image);
    this.editcategory.controls['category'].patchValue(this.myobj.category);
  }
  UpdateCategory() {
    console.log('in update sid : ' + this.myobj.sid);
    console.log('in update image :' + this.myobj.image);
    console.log('in update service :' + this.myobj.category);
    // tslint:disable-next-line:max-line-length
    this.endpointService.updateCategory(this.editcategory.value.id, this.editcategory.value.sid, this.editcategory.value.image, this.editcategory.value.category)
      .subscribe(
        data => {
          console.log(this.editcategory.value.image);
          console.log(this.editcategory.value.category);
          console.log(data);
          this.router.navigate(['list-category']);
        },
        error => {
          alert(error);
        });
  }



}
