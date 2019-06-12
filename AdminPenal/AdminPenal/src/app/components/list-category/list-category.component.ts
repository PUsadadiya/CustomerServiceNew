import { Router, NavigationExtras } from '@angular/router';
import { CategoryInfo } from './../../models/categoryinfo';
import { Component, OnInit } from '@angular/core';
import { EndpointService } from 'src/app/services/endpoint.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { filter } from 'rxjs/operators';
import { LocalStorage } from '@ngx-pwa/local-storage';
@Component({
  selector: 'app-list-category',
  templateUrl: './list-category.component.html',
  styleUrls: ['./list-category.component.css']
})
export class ListCategoryComponent implements OnInit {
  category: FormGroup;
  list: CategoryInfo[];
  public imagePath;
  public imgURL: any;
  fileToUpload: File;
  public message: string;
  // tslint:disable-next-line:max-line-length
  constructor(private formBuilder: FormBuilder, private router: Router, private endpointService: EndpointService, private localStorage: LocalStorage) { }
  ngOnInit() {
    this.getdata();
  }
  getdata() {
    this.category = this.formBuilder.group({
      id: [],
      type: [],
      size: [],
      category: []
    });
    this.endpointService.GetCategory(this.category.value.size, this.category.value.type, this.category.value.category)
      .subscribe(data => {
        console.log(data);
        this.list = data;
      });
  }
  AddCategory(): void {
    this.router.navigate(['addcategory']);
  }
  deleteCategory(id: CategoryInfo): void {
    this.endpointService.deleteCategory(id)
      .subscribe(data => {
        this.getdata();
      });

  }
  editCategory(id: CategoryInfo): void {
    this.endpointService.getCategoryById(id)
      .subscribe(data => {
        const navigationExtras: NavigationExtras = {
          queryParams: {
            'category': JSON.stringify(data)
          }
        };
        this.router.navigate(['edit-category'], navigationExtras);
      });
 }
  AddService(id: CategoryInfo): void {
    const navigationExtras: NavigationExtras = {
      queryParams: {
        'cid': JSON.stringify(id)
      }
    };
    console.log(navigationExtras);
    this.router.navigate(['addservice'], navigationExtras);
    console.log('success');
  }
}
