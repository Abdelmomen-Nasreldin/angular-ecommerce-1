import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule, HttpInterceptor } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgIconsModule } from '@ng-icons/core';
import { ReactiveFormsModule } from '@angular/forms';
import { bootstrapInstagram, bootstrapFacebook, bootstrapTiktok, bootstrapTwitter, bootstrapLinkedin, bootstrapYoutube, bootstrapStarFill } from '@ng-icons/bootstrap-icons';


import { HeaderComponent } from './Components/header/header.component';
import { FooterComponent } from './Components/footer/footer.component';
import { ProductComponent } from './Components/product/product.component';
import { ProductsListComponent } from './Components/products-list/products-list.component';
import { ProductDetailsComponent } from './Components/product-details/product-details.component';
import { NotFoundComponent } from './Components/not-found/not-found.component';
import { CarouselComponent } from './Components/carousel/carousel.component';
import { LoginComponent } from './Pages/login/login.component';
import { RegisterComponent } from './Pages/register/register.component';
import { HomeComponent } from './Pages/home/home.component';
import { FormErrorMsgComponent } from './Components/form-error-msg/form-error-msg.component';
import { MainLayoutComponent } from './Layouts/main-layout/main-layout.component';
import { LoadingDesignComponent } from './Components/loading-design/loadingDesign.component';
import { CartComponent } from './Pages/cart/cart.component';
import { CategoriesComponent } from './Pages/categories/categories.component';
import { BrandsComponent } from './Pages/brands/brands.component';
import { ProductsComponent } from './Pages/products/products.component';
import { WishListComponent } from './Pages/wishList/wishList.component';
import { AuthInterceptorService } from './Services/auth-interceptor/auth-interceptor.service';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    ProductComponent,
    ProductsListComponent,
    ProductDetailsComponent,
    NotFoundComponent,
    CarouselComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    FormErrorMsgComponent,
    MainLayoutComponent,
    LoadingDesignComponent,
    CartComponent,
    CategoriesComponent,
    BrandsComponent,
    ProductsComponent,
    WishListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgIconsModule.withIcons({bootstrapInstagram, bootstrapFacebook, bootstrapTiktok, bootstrapTwitter, bootstrapLinkedin, bootstrapYoutube, bootstrapStarFill}),

  ],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
