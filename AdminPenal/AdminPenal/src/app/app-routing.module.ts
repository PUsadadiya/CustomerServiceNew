import { EditServiceComponent } from './components/edit-service/edit-service.component';
import { ListServiceComponent } from './components/list-service/list-service.component';
import { AddcategoryComponent } from './components/addcategory/addcategory.component';
import { AddserviceComponent } from './components/addservice/addservice.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { ListCategoryComponent } from './components/list-category/list-category.component';
import { HeaderComponent } from './components/header/header.component';
import { identifierModuleUrl } from '@angular/compiler';
import { EditCategoryComponent  } from './components/edit-category/edit-category.component';
import { AuthGuard } from './guard/auth.guard';
import { PagenotfoundComponent } from './components/pagenotfound/pagenotfound.component';
import { ListOrderComponent } from './components/list-order/list-order.component';

import { FooterComponent } from './components/footer/footer.component';
const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'header', component: HeaderComponent},
  { path: 'footer', component: FooterComponent},
  { path: 'addservice', component: AddserviceComponent },
  { path: 'addcategory', component: AddcategoryComponent },
  { path: 'list-service', component: ListServiceComponent },
  { path: 'list-category', component: ListCategoryComponent },
  { path: 'list-order', component: ListOrderComponent },
  { path: 'edit-service', component: EditServiceComponent },
  { path: 'edit-category', component: EditCategoryComponent},
  { path: '**', component: PagenotfoundComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
