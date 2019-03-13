import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EndpointService } from 'src/app/services/endpoint.service';

@Component({
  selector: 'app-addservice',
  templateUrl: './addservice.component.html',
  styleUrls: ['./addservice.component.css']
})
export class AddserviceComponent implements OnInit {
  public addservice: FormGroup;
  constructor(private formBuilder: FormBuilder, private endpointService: EndpointService, private router: Router) {
    // this.router.navigate(['/home']);
  }
  ngOnInit() {
    this.addservice = this.formBuilder.group({
      // id: [],
      image: ['', Validators.required],
      service: ['', Validators.required]
    });
  }
  AddService() {
    // this.submitted = true;
    this.endpointService.AddService(this.addservice.value.image, this.addservice.value.service)
      .subscribe(data => {
        this.router.navigate(['list-service']);
        console.log(data);
      });
  }

}
