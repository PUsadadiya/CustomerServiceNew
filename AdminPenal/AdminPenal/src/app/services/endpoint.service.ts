
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
    const loginParameter = {
      'email': email,
      'password': password
    };
    console.log(loginParameter);
    return this.httpClient.post<any>('http://192.168.32.56:1337/login/login', loginParameter);

  }
  AddCategory(image, category): Observable<CategoryInfo> {
    // const uploadFormData = new FormData();
    // uploadFormData.append('image', fileToUpload,fileToUpload.name);
    // uploadFormData.append('category',category);
    // console.log( uploadFormData);
    const newcategory = {
      'image': image,
      'category': category
    };
    console.log(newcategory);
    return this.httpClient.post<any>('http://192.168.32.56:1337/category/addcategory', newcategory);
  }
  GetCategory(type, size, category): Observable<CategoryInfo[]> {
    // debugger;
    const userinfo = JSON.parse(this.cookieService.get('currentUser'));
    console.log(userinfo.token);
    const categorylist = new HttpParams()
      .set('type', type)
      .set('size', size)
      .set('category', category);
    return this.httpClient.get<any>('http://192.168.32.56:1337/category/view', {
      params: categorylist
    });

  }
  deleteCategory(id): Observable<any> {
    return this.httpClient.delete<CategoryInfo[]>('http://192.168.32.56:1337/category/' + id);
  }
  updateCategory(id, type, size, category): Observable<CategoryInfo> {

    // const servicelist = new HttpParams()
    // .set('id',id)
    // .set('image', image)
    // .set('service', service);
    const categorylist = {
      "id": id,
      "type":type,
      "size":size,
      "category": category
    };
    return this.httpClient.put<any>('http://192.168.32.56:1337/category/update/', categorylist);
    // params: servicelist
    // });
  }
  getCategoryById(id): Observable<any> {
    console.log(id);
    return this.httpClient.get<CategoryInfo[]>('http://192.168.32.56:1337/category/' + id);
  }
  getServiceById(id): Observable<any> {
    console.log(id);
    return this.httpClient.get<ServiceInfo[]>('http://192.168.32.56:1337/Service/' + id);
  }
  AddService(cid, image, service): Observable<ServiceInfo> {
    const newservice = {
      "cid": cid,
      "image": image,
      "service": service
    };
    // .set('image', image)
    // .set('service', service);
    console.log(newservice);
    return this.httpClient.post<any>('http://192.168.32.56:1337/service/addservice', newservice);
  }
  GetService(cid, type, size, service) {
    const servicelist = new HttpParams()
      .set('cid', cid)
      .set('type', type)
      .set('size', size)
      .set('service', service);
    return this.httpClient.get<ServiceInfo[]>('http://192.168.32.56:1337/Service/Service', {
      params: servicelist
    });

  }
  deleteService(id): Observable<any> {
    return this.httpClient.delete<ServiceInfo[]>('http://192.168.32.56:1337/Service/' + id);
  }
  updateService(id, cid, type, size, service): Observable<ServiceInfo> {
    const updateservice = {
      "id": id,
      "cid": cid,
      "type": type,
      "size": size,
      "service": service
    };
    return this.httpClient.put<any>('http://192.168.32.56:1337/service/update/', updateservice);
  }
  GetOrderList(id, userid, categoryid, serviceid, username, email, mobile, location, start_date, start_time, end_date, OrderStatus) {
    const Orderlist = new HttpParams()
      .set('id', id)
      .set('userid', userid)
      .set('categoryid', categoryid)
      .set('serviceid', serviceid)
      .set('username', username)
      .set('email', email)
      .set('mobile', mobile)
      .set('location', location)
      .set('start_date', start_date)
      .set('start_time', start_time)
      .set('end_date', end_date)
      .set('status', OrderStatus);
    return this.httpClient.get<OrderInfo[]>('http://192.168.32.56:1337/OrderService/OrderList', {
      params: Orderlist
    });
  }
  deleteOrder(id): Observable<any> {
    return this.httpClient.delete<OrderInfo[]>('http://192.168.32.56:1337/OrderService/' + id);
  }
  getOrderById(id): Observable<any> {
    console.log(id);
    return this.httpClient.get<OrderInfo[]>('http://192.168.32.56:1337/OrderService/' + id);
  }
  // updateOrder(id, OrderStatus): Observable<OrderInfo> {
  // //   // debugger;
  // //   const updateorder = {
  // //     "id":id,
  // //     "OrderStatus":OrderStatus
  // //   };
  //   return this.httpClient.put<any>('http://192.168.32.56:1337/OrderService/update/', updateorder);
  // }
}
