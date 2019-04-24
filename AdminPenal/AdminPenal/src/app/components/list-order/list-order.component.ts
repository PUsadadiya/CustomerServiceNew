import { HttpClient, HttpParams } from '@angular/common/http';
import { Orderstatus } from './orderstatus';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { OrderInfo } from 'src/app/models/orderinfo';
import { Router, NavigationExtras } from '@angular/router';
import { Observable } from 'rxjs';
import { EndpointService } from 'src/app/services/endpoint.service';
// import {DialogService} from 'angular-dialog-service';

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

  orderStatus = Orderstatus;
  ngOnInit() {
    this.getdata();

  }
  getdata() {
    this.order = this.formBuilder.group({
      id: [],
      userid: [],
      categoryid: [],
      serviceid: [],
      username: [],
      email: [],
      mobile: [],
      location: [],
      start_date: [],
      start_time: [],
      end_date: [],
      OrderStatus: []
    });
    this.endpointService.GetOrderList(this.order.value.id, this.order.value.userid, this.order.value.categoryid, this.order.value.serviceid,
      this.order.value.username, this.order.value.email, this.order.value.mobile, this.order.value.location,
      this.order.value.start_date, this.order.value.start_time, this.order.value.end_date, this.order.value.OrderStatus)
      .subscribe(data => {
        console.log();
        this.list = data;

      });
  }
  orderid(userid: OrderInfo) {
    debugger;


    console.log(userid);
    // this.endpointService.getOrderById()
    //   .subscribe(data => {
    //     console.log(data);
    //   });
  }
  onaccepted(id: OrderInfo) {
    console.log(id);
    if (confirm('Are you sure you want Accept order? ')) {
      const status = {
        'OrderStatus': 0,
        'id': id
      };
      this.httpClient.put('http://192.168.32.56:1337/OrderService/update/', status).subscribe(
        data => {
          console.log(data);
          this.getdata();
        });
    }
  }
  onrejected(id: OrderInfo) {
    if (confirm(' Are you sure you want to Reject order? ')) {
      const status = {
        'OrderStatus': 1,
        'id': id
      };
      return this.httpClient.put<any>('http://192.168.32.56:1337/OrderService/update/', status).subscribe(
        data => {
          console.log(data);
          this.getdata();
        });
      }
  }
  oncompleted(id: OrderInfo) {
    if (confirm(' order Completed ? ')) {
      const status = {
        'OrderStatus': 2,
        'id': id
      };
      this.httpClient.put('http://192.168.32.56:1337/OrderService/update/', status).subscribe(
        data => {
          console.log(data);
          this.getdata();
        });
    }
  }

}
