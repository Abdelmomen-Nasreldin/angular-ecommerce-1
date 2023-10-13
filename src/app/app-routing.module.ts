import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from './Guards/auth.guard';

import { MainLayoutComponent } from './Layouts/main-layout/main-layout.component';
import { HomeComponent } from './Pages/home/home.component';
import { CartComponent } from './Pages/cart/cart.component';
import { ProductsComponent } from './Pages/products/products.component';
import { CategoriesComponent } from './Pages/categories/categories.component';
import { BrandsComponent } from './Pages/brands/brands.component';
import { ProductDetailsComponent } from './Components/product-details/product-details.component';
import { LoginComponent } from './Pages/login/login.component';
import { RegisterComponent } from './Pages/register/register.component';
import { WishListComponent } from './Pages/wishList/wishList.component';
import { NotFoundComponent } from './Components/not-found/not-found.component';

const routes: Routes = [
  {path: '', component:MainLayoutComponent, children: [
    {path: '', component:HomeComponent},
    {path: 'home', redirectTo: ''},
    {path: 'cart', component: CartComponent,canActivate: [authGuard()]},
    {path: 'products', component: ProductsComponent},
    {path: 'categories', component: CategoriesComponent},
    {path: 'brands', component: BrandsComponent},
    {path: 'productDetails/:id', component: ProductDetailsComponent},
    {path: 'login', component: LoginComponent},
    {path: 'register', component: RegisterComponent},
    {path: 'wishList', component: WishListComponent,canActivate: [authGuard()]},
    {path: '**', component: NotFoundComponent},
  ]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
exports: [RouterModule]
})
export class AppRoutingModule { }
