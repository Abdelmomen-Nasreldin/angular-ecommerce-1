import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgIconsModule } from '@ng-icons/core';
import { ReactiveFormsModule } from '@angular/forms';
import { bootstrapInstagram, bootstrapFacebook, bootstrapTiktok, bootstrapTwitter, bootstrapLinkedin, bootstrapYoutube, bootstrapStarFill } from '@ng-icons/bootstrap-icons';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';


import { HeaderComponent } from './Components/header/header.component';
import { FooterComponent } from './Components/footer/footer.component';
import { ProductComponent } from './Components/product/product.component';
import { ProductsListComponent } from './Components/products-list/products-list.component';
import { ProductDetailsComponent } from './Components/product-details/product-details.component';
import { NotFoundComponent } from './Components/not-found/not-found.component';
import { CarouselComponent } from './Components/carousel/carousel.component';
import { LoginComponent } from './Components/login/login.component';
import { RegisterComponent } from './Components/register/register.component';
import { HomeComponent } from './Components/home/home.component';
import { FormErrorMsgComponent } from './Components/form-error-msg/form-error-msg.component';
import { MainLayoutComponent } from './Layouts/main-layout/main-layout.component';

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
    MainLayoutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule,
    NgIconsModule.withIcons({bootstrapInstagram, bootstrapFacebook, bootstrapTiktok, bootstrapTwitter, bootstrapLinkedin, bootstrapYoutube, bootstrapStarFill}),

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
