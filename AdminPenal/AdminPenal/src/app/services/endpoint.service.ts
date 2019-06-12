import { OrderInfo } from '../models/OrderInfo';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from 'src/app/services/auth.service';
import { ServiceInfo } from './../models/serviceinfo';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpParams, HttpClient, HttpHeaders } from '@angular/common/http';
import { LoginResponse } from '../models/loginResponse';
import { CategoryInfo } from '../models/categoryinfo';
@Injectable({
  providedIn: 'root'
})
export class EndpointService {
  constructor(private httpClient: HttpClient, private cookieService: CookieService) { }
  ValidateUser(email, password): Observable<LoginResponse> {
    // console.log(this.rootURL);
    const loginParameter = {
      'email': email,
      'password': password
    };
    console.log(loginParameter);
    return this.httpClient.post<any>(environment.webApiServerUrl + 'login/login', loginParameter);
  }
  AddCategory(image, category): Observable<CategoryInfo> {
    const newcategory = {
      'image': image,
      'category': category
    };
    console.log(newcategory);
    return this.httpClient.post<any>(environment.webApiServerUrl + 'category/upload', newcategory);
  }
  GetCategory(type, size, category): Observable<CategoryInfo[]> {
    const userinfo = JSON.parse(this.cookieService.get('currentUser'));
    const categorylist = new HttpParams()
      .set('type', type)
      .set('size', size)
      .set('category', category);
    return this.httpClient.get<any>(environment.webApiServerUrl + 'category/view', {
      params: categorylist
    });

  }
  deleteCategory(id): Observable<any> {
    return this.httpClient.delete<CategoryInfo[]>(environment.webApiServerUrl + 'category/' + id);
  }
  updateCategory(id, type, size, category): Observable<CategoryInfo> {
    const categorylist = {
      "id": id,
      "type": type,
      "size": size,
      "category": category
    };
    return this.httpClient.put<any>(environment.webApiServerUrl + 'category/update/', categorylist);
  }
  getCategoryById(id): Observable<any> {
    return this.httpClient.get<CategoryInfo[]>(environment.webApiServerUrl + 'category/' + id);
  }
  getServiceById(id): Observable<any> {
    return this.httpClient.get<ServiceInfo[]>(environment.webApiServerUrl + 'Service/' + id);
  }
  AddService(cid, image, service): Observable<ServiceInfo> {
    const newservice = {
      "cid": cid,
      "image": image,
      "service": service
    };
    // let formData = new FormData();
    // formData.append('cid',this.addservice.value.cid);
    // formData.append('image', this.fileToUpload, this.fileToUpload.name);
    // formData.append('service', this.fileToUpload.name);
    // console.log(formData);
    // this.httpClient
    //   .post(environment.webApiServerUrl + 'service/upload', formData).subscribe(data => {
    //     console.log(data);
    //     this.router.navigate(['list-service']);
    //   });
    return this.httpClient.post<any>(environment.webApiServerUrl + 'service/upload', newservice);
  }
  GetService(cid, type, size, service,price) {
    const servicelist = new HttpParams()
      .set('cid', cid)
      .set('type', type)
      .set('size', size)
      .set('service', service)
      .set('price', price);
    return this.httpClient.get<ServiceInfo[]>(environment.webApiServerUrl + 'Service/Service', {
      params: servicelist
    });

  }
  deleteService(id): Observable<any> {
    return this.httpClient.delete<ServiceInfo[]>(environment.webApiServerUrl + 'Service/' + id);
  }
  updateService(id, cid, type, size, service,price): Observable<ServiceInfo> {
    const updateservice = {
      "id": id,
      "cid": cid,
      "type": type,
      "size": size,
      "service": service,
      "price": price
    };
    return this.httpClient.put<any>(environment.webApiServerUrl + 'service/update/', updateservice);
  }
  // tslint:disable-next-line:max-line-length
  GetOrderList(id, username, email,categoryname,servicename, mobile,OrderAddress, start_date, start_time, end_date,totalamount,orderstatus) {
    const Orderlist = new HttpParams()
      .set('id', id)
      // .set('userid', userid)
      // .set('categoryid', categoryid)
      // .set('serviceid', serviceid)
      .set('username', username)
      .set('email', email)
      .set('categoryname', categoryname)
      .set('servicename', servicename)
      .set('mobile', mobile)
      .set('OrderAddress', OrderAddress)
      .set('start_date', start_date)
      .set('start_time', start_time)
      .set('end_date', end_date)
      .set('end_date', totalamount)
      .set('status', orderstatus);
    return this.httpClient.get<OrderInfo[]>(environment.webApiServerUrl + 'OrderService/OrderList', {
      params: Orderlist
    });
  }

}
