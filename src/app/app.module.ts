import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgIconsModule } from '@ng-icons/core';
import { bootstrapInstagram, bootstrapFacebook, bootstrapTiktok, bootstrapTwitter, bootstrapLinkedin, bootstrapYoutube } from '@ng-icons/bootstrap-icons';


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
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NgIconsModule.withIcons({bootstrapInstagram, bootstrapFacebook, bootstrapTiktok, bootstrapTwitter, bootstrapLinkedin, bootstrapYoutube}),

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
