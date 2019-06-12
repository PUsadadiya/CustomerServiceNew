import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { OrderInfo } from 'src/app/models/orderinfo';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { EndpointService } from 'src/app/services/endpoint.service';

@Component({
  selector: 'app-list-order',
  templateUrl: './list-order.component.html',
  styleUrls: ['./list-order.component.css']
})
export class ListOrderComponent implements OnInit {
  order: FormGroup;
  list: OrderInfo[];
  // tslint:disable-next-line:max-line-length
  constructor(private formBuilder: FormBuilder, private router: Router, private httpClient: HttpClient, private endpointService: EndpointService) { }
  ngOnInit() {
    this.getdata();

  }
  getdata() {
    this.order = this.formBuilder.group({
      id: [],
      // userid: [],
      // categoryid: [],
      // serviceid: [],
      username: [],
      email: [],
      category_name: [],
      service_name: [],
      mobile: [],
      OrderAddress: [],
      start_date: [],
      start_time: [],
      end_date: [],
      totalamount: [],
      orderstatus: []
    });
    // this.order.value.userid, this.order.value.categoryid, this.order.value.serviceid,
    // tslint:disable-next-line:max-line-length
    this.endpointService.GetOrderList(this.order.value.id, this.order.value.username, this.order.value.email, this.order.value.category_name, this.order.value.service_name, this.order.value.mobile, this.order.value.OrderAddress,this.order.value.start_date, this.order.value.start_time, this.order.value.end_date, this.order.value.totalamount, this.order.value.orderstatus)
      .subscribe(data => {
        console.log(data);
        this.list = data;

      });
  }
  onaccepted(id: OrderInfo) {
    debugger;
    console.log(id);
    if (confirm('Are you sure you want Accept order? ')) {
      const status = {
        'orderstatus': 0,
        'id': id
      };
      this.httpClient.put(environment.webApiServerUrl + 'OrderService/update/', status).subscribe(
        data => {
          console.log(data);
          this.getdata();
        });
    }
  }
  onrejected(id: OrderInfo) {
    debugger;
    if (confirm(' Are you sure you want to Reject order? ')) {
      const status = {
        'orderstatus': 1,
        'id': id
      };
      return this.httpClient.put<any>(environment.webApiServerUrl + 'OrderService/update/', status).subscribe(
        data => {
          console.log(data);
          this.getdata();
        });
    }
  }
  oncompleted(id: OrderInfo) {
    debugger;
    if (confirm(' order Completed ? ')) {
      const status = {
        'orderstatus': 2,
        'id': id
      };
      this.httpClient.put(environment.webApiServerUrl + 'OrderService/update/', status).subscribe(
        data => {
          console.log(data);
          this.getdata();
        });
    }
  }

}
