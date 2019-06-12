import { AuthGuard } from './guard/auth.guard';
import { AuthService } from './services/auth.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { HeaderComponent } from './components/header/header.component';
import { AlertComponent } from './components/alert/alert.component';
import { CookieService } from 'ngx-cookie-service';
import { EndpointService } from './services/endpoint.service';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './components/home/home.component';
import { FormsModule, ReactiveFormsModule, FormGroup, FormBuilder, Validators} from '@angular/forms';
import { AddserviceComponent } from './components/addservice/addservice.component';
import { ListServiceComponent } from './components/list-service/list-service.component';
import { AddcategoryComponent } from './components/addcategory/addcategory.component';
import { ListCategoryComponent } from './components/list-category/list-category.component';
import { EditServiceComponent } from './components/edit-service/edit-service.component';
import { EditCategoryComponent } from './components/edit-category/edit-category.component';
import { PagenotfoundComponent } from './components/pagenotfound/pagenotfound.component';
import { ListOrderComponent } from './components/list-order/list-order.component';

import { DatePipe } from '@angular/common';
import { FooterComponent } from './components/footer/footer.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HeaderComponent,
    AlertComponent,
    HomeComponent,
    AddserviceComponent,
    ListServiceComponent,
    AddcategoryComponent,
    ListCategoryComponent,
    EditServiceComponent,
    EditCategoryComponent,
    PagenotfoundComponent,
    ListOrderComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [AuthService, CookieService, EndpointService, AuthGuard, DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
