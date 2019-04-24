import { ServiceInfo } from './../../models/Serviceinfo';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router, NavigationExtras } from '@angular/router';
import { EndpointService } from 'src/app/services/endpoint.service';

@Component({
  selector: 'app-list-service',
  templateUrl: './list-service.component.html',
  styleUrls: ['./list-service.component.css']
})
export class ListServiceComponent implements OnInit {
  service: FormGroup;
  list: ServiceInfo[];
  constructor(private formBuilder: FormBuilder, private router: Router, private endpointService: EndpointService) { }

  ngOnInit() {
    this.getdata();
  }
  getdata(): void {
    this.service = this.formBuilder.group({
      id: [],
      cid: [],
      type: [],
      size: [],
      service: []
    });
    this.endpointService.GetService(this.service.value.sid, this.service.value.type, this.service.value.size, this.service.value.service)
      .subscribe(data => {
        console.log(data);
        this.list = data;
      });
  }
  AddService(): void {
    this.router.navigate(['addservice']);
    console.log('success');
  }
  deleteService(id: ServiceInfo): void {
    this.endpointService.deleteService(id)
      .subscribe(data => {
        this.getdata();
      });

  }
  editService(id: ServiceInfo): void {
    console.log(id);
    this.endpointService.getServiceById(id)
      .subscribe(data => {
        console.log(data);
        const navigationExtras: NavigationExtras = {
          queryParams: {
            "service": JSON.stringify(data)
          }
        };
        console.log(navigationExtras);
        this.router.navigate(['edit-service'], navigationExtras);
        // this.editservices.setValue(data);
      });

  }
}
