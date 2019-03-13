import { Router, NavigationExtras } from '@angular/router';
import { ServiceInfo } from './../../models/serviceinfo';
import { Component, OnInit } from '@angular/core';
import { EndpointService } from 'src/app/services/endpoint.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { filter } from 'rxjs/operators';
import { LocalStorage } from '@ngx-pwa/local-storage';
@Component({
  selector: 'app-list-service',
  templateUrl: './list-service.component.html',
  styleUrls: ['./list-service.component.css']
})
export class ListServiceComponent implements OnInit {

  services: FormGroup;
  list: ServiceInfo[];

  // tslint:disable-next-line:max-line-length
  constructor(private formBuilder: FormBuilder, private router: Router, private endpointService: EndpointService, private localStorage: LocalStorage) { }

  ngOnInit() {

    this.services = this.formBuilder.group({
      id: [],
      image: [],
      service: []
    });
    this.endpointService.GetService(this.services.value.image, this.services.value.service)
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
        this.services = this.services.filter(services => services.id !== id);
        this.services.push();
        console.log(data);
        this.router.navigate(['service-list']);
      });

  }
  editService(id: ServiceInfo): void {

    console.log(id);
    this.endpointService.getServiceById(id)
      .subscribe(data => {
        console.log(data);
        let navigationExtras: NavigationExtras = {
          queryParams: {
            "service": JSON.stringify(data)
          }
        };
        console.log(navigationExtras);
        this.router.navigate(['edit-service'], navigationExtras);
        // this.editservices.setValue(data);
      });

  }
  Addcategory(): void {
    this.router.navigate(['addcategory']);
    console.log('success');
  }
}
