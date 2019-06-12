import { ServiceInfo } from './../../models/serviceinfo';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, NgForm, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LocalStorage } from '@ngx-pwa/local-storage';
import { EndpointService } from 'src/app/services/endpoint.service';
@Component({
  selector: 'app-edit-service',
  templateUrl: './edit-service.component.html',
  styleUrls: ['./edit-service.component.css']
})
export class EditServiceComponent implements OnInit {
  editservice: FormGroup;
 serviceInfo: ServiceInfo;
  myobj: any;
  // tslint:disable-next-line:max-line-length
  constructor(private formBuilder: FormBuilder, private route: ActivatedRoute, private localStorage: LocalStorage, private router: Router, private endpointService: EndpointService) { }
  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.myobj = JSON.parse(params['service']);
      this.editservice = this.formBuilder.group({
        id: [],
        cid: [],
        type: [],
        size:[],
       service: [],
       price:[]
      });
    });
    this.editservice.controls['id'].patchValue(this.myobj.id);
    this.editservice.controls['cid'].patchValue(this.myobj.cid);
    this.editservice.controls['type'].patchValue(this.myobj.type);
    this.editservice.controls['size'].patchValue(this.myobj.size);
    this.editservice.controls['service'].patchValue(this.myobj.service);
    this.editservice.controls['price'].patchValue(this.myobj.price);
  }
  UpdateService() {
    // tslint:disable-next-line:max-line-length
    this.endpointService.updateService(this.editservice.value.id, this.editservice.value.cid, this.editservice.value.type, this.editservice.value.size, this.editservice.value.service, this.editservice.value.price)
      .subscribe(
        data => {
          console.log(data);
          this.router.navigate(['list-service']);
        },
        error => {
          alert(error);
        });
  }
}
