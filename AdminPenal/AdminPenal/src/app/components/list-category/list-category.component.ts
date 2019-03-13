import { CategoryInfo } from './../../models/categoryinfo';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router, NavigationExtras } from '@angular/router';
import { EndpointService } from 'src/app/services/endpoint.service';

@Component({
  selector: 'app-list-category',
  templateUrl: './list-category.component.html',
  styleUrls: ['./list-category.component.css']
})
export class ListCategoryComponent implements OnInit {
  category: FormGroup;
  list: CategoryInfo[];
  constructor(private formBuilder: FormBuilder, private router: Router, private endpointService: EndpointService) { }

  ngOnInit() {
    this.category = this.formBuilder.group({
      id: [],
      sid: [],
      image: [],
      category: []
    });
    this.endpointService.Getcategory(this.category.value.id, this.category.value.image, this.category.value.category)
      .subscribe(data => {
        console.log(data);
        this.list = data;
      });
  }
  Addcategory(): void {
    this.router.navigate(['addcategory']);
    console.log('success');
  }
  deleteCategory(id: CategoryInfo): void {
    this.endpointService.deleteCategory(id)
      .subscribe(data => {
        this.category = this.category.filter(category => category.id !== id);
        this.category.push();
        console.log(data);
        this.router.navigate(['list-category']);
      });

  }
  editCategory(id: CategoryInfo): void {
    console.log(id);
    this.endpointService.getCategoryById(id)
      .subscribe(data => {
        console.log(data);
        const navigationExtras: NavigationExtras = {
          queryParams: {
            "category": JSON.stringify(data)
          }
        };
        console.log(navigationExtras);
        this.router.navigate(['edit-category'], navigationExtras);
        // this.editservices.setValue(data);
      });

  }
}


