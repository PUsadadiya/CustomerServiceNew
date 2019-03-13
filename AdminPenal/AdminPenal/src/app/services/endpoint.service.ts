import { ServiceInfo } from './../models/serviceinfo';
import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpParams, HttpClient } from '@angular/common/http';
import { LoginResponse } from '../models/loginResponse';
import { CategoryInfo } from '../models/categoryinfo';


@Injectable({
  providedIn: 'root'
})
export class EndpointService {

  constructor(private httpClient: HttpClient) { }

  ValidateUser(email, password): Observable<LoginResponse> {
    // const loginParameter = new HttpParams()
    //   .set('email', email)
    //   .set('password', password);
    const loginParameter = {
      'email': email,
      'password': password
    };
    console.log(loginParameter);
    return this.httpClient.post<any>('http://192.168.32.56:1337/login/login', loginParameter);
    // {      params: loginParameter
    // });

  }

  AddService(image, service): Observable<ServiceInfo> {
    const newservice = {
      'image': image,
      'service': service
    };
    console.log(newservice);
    return this.httpClient.post<any>('http://192.168.32.56:1337/service/addservice', newservice);
  }
  GetService(image, service) {
    const servicelist = new HttpParams()
      .set('image', image)
      .set('service', service);
    return this.httpClient.get<ServiceInfo[]>('http://192.168.32.56:1337/service/view', {
      params: servicelist
    });

  }
  deleteService(id): Observable<any> {
    return this.httpClient.delete<ServiceInfo[]>('http://192.168.32.56:1337/service/' + id);
  }
  updateService(id, image, service): Observable<ServiceInfo> {

    // const servicelist = new HttpParams()
    // .set('id',id)
    // .set('image', image)
    // .set('service', service);
    const services = {
      "id": id,
      "image": image,
      "service": service
    };
    return this.httpClient.put<any>('http://192.168.32.56:1337/service/update/', services);
    // params: servicelist
    // });
  }
  getServiceById(id): Observable<any> {
    console.log(id);
    return this.httpClient.get<ServiceInfo[]>('http://192.168.32.56:1337/service/' + id);
  }
  getCategoryById(id): Observable<any> {
    console.log(id);
    return this.httpClient.get<CategoryInfo[]>('http://192.168.32.56:1337/Servicecategory/' + id);
  }
  Addcategory(sid, image, category): Observable<CategoryInfo> {
    const newcategory = {
      "sid": sid,
      "image": image,
      "category": category
    };
    // .set('image', image)
    // .set('service', service);
    console.log(newcategory);
    return this.httpClient.post<any>('http://192.168.32.56:1337/servicecategory/addcategory', newcategory);
  }
  Getcategory(sid, image, service) {
    const categorylist = new HttpParams()
      .set('sid', sid)
      .set('image', image)
      .set('service', service);
    return this.httpClient.get<CategoryInfo[]>('http://192.168.32.56:1337/Servicecategory/Category', {
      params: categorylist
    });

  }
  deleteCategory(id): Observable<any> {
    return this.httpClient.delete<CategoryInfo[]>('http://192.168.32.56:1337/Servicecategory/' + id);
  }
  updateCategory(id, sid, image, category): Observable<CategoryInfo> {
    const updatecategory = {
      "id": id,
      "sid": sid,
      "image": image,
      "category": category
    };
    return this.httpClient.put<any>('http://192.168.32.56:1337/servicecategory/update/', updatecategory);
  }
}
