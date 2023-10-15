import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule, HttpInterceptor } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';

import { ProductComponent } from './Components/product/product.component';
import { ProductsListComponent } from './Components/products-list/products-list.component';
import { ProductDetailsComponent } from './Components/product-details/product-details.component';
import { CarouselComponent } from './Components/carousel/carousel.component';
import { LoginComponent } from './Pages/login/login.component';
import { RegisterComponent } from './Pages/register/register.component';
import { HomeComponent } from './Pages/home/home.component';
import { FormErrorMsgComponent } from './Components/form-error-msg/form-error-msg.component';
import { MainLayoutComponent } from './Layouts/main-layout/main-layout.component';
import { CategoriesComponent } from './Pages/categories/categories.component';
import { BrandsComponent } from './Pages/brands/brands.component';
import { ProductsComponent } from './Pages/products/products.component';
import { WishListComponent } from './Pages/wishList/wishList.component';
import { AuthInterceptorService } from './Services/auth-interceptor/auth-interceptor.service';
import { SharedModule } from './shared/shared.module';

@NgModule({
  declarations: [
    AppComponent,
    ProductComponent,
    ProductsListComponent,
    ProductDetailsComponent,
    CarouselComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    FormErrorMsgComponent,
    MainLayoutComponent,
    CategoriesComponent,
    BrandsComponent,
    ProductsComponent,
    WishListComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    SharedModule,
  ],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
