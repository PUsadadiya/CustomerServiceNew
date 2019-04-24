import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { CategoryInfo } from 'src/app/models/categoryinfo';
import { ActivatedRoute, Router } from '@angular/router';
import { LocalStorage } from '@ngx-pwa/local-storage';
import { EndpointService } from 'src/app/services/endpoint.service';
import { OrderInfo } from 'src/app/models/OrderInfo';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-edit-order',
  templateUrl: './edit-order.component.html',
  styleUrls: ['./edit-order.component.css']
})
export class EditOrderComponent implements OnInit {
  editorder: FormGroup;
  OrderInfo: OrderInfo;
  myobj: any;
  // tslint:disable-next-line:max-line-length
  constructor(private formBuilder: FormBuilder, private route: ActivatedRoute, private localStorage: LocalStorage, private datePipe: DatePipe, private router: Router, private endpointService: EndpointService) {

  }

  ngOnInit() {
    const date = new Date();
    const dat = this.datePipe.transform(date, 'yyyy-MM-dd');

    // this.datePipe.transform('start_date', 'yyyy-MM-dd');

    this.route.queryParams.subscribe(params => {
      this.myobj = JSON.parse(params["order"]);
      console.log(this.myobj);
      console.log(this.myobj.sid);
      console.log(this.myobj.location);
      console.log(this.datePipe.transform(this.myobj.start_date, 'yyyy-MM-dd'));

      this.editorder = this.formBuilder.group({
        id: [],
        sid: [],
        location: [],
        start_date: [],
        start_time: [],
        end_date: []
      });
    });
    this.editorder.controls['id'].patchValue(this.myobj.id);
    this.editorder.controls['sid'].patchValue(this.myobj.sid);
    this.editorder.controls['location'].patchValue(this.myobj.location);
    this.editorder.controls['start_date'].patchValue(this.datePipe.transform(this.myobj.start_date, 'yyyy-MM-dd'));
    this.editorder.controls['start_time'].patchValue(this.myobj.start_time);
    this.editorder.controls['end_date'].patchValue(this.datePipe.transform(this.myobj.end_date, 'yyyy-MM-dd'));
  }



}
