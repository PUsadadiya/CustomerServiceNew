import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EndpointService } from 'src/app/services/endpoint.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-addcategory',
  templateUrl: './addcategory.component.html',
  styleUrls: ['./addcategory.component.css']
})
export class AddcategoryComponent implements OnInit {
  public addcategory: FormGroup;
  constructor(private formBuilder: FormBuilder, private endpointService: EndpointService, private router: Router) {
  }
  ngOnInit() {
    this.addcategory = this.formBuilder.group({
      sid: ['', Validators.required],
      image: ['', Validators.required],
      category: ['', Validators.required]
    });
  }
  Addcategory() {
    // this.submitted = true;
    this.endpointService.Addcategory(this.addcategory.value.sid, this.addcategory.value.image, this.addcategory.value.category)
      .subscribe(data => {
        this.router.navigate(['list-category']);
        console.log(data);
      });
  }
}


