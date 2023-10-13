import { Subscription, map } from 'rxjs';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/Models/product';
import { CartService } from 'src/app/Services/cart/cart.service';
import { ProductsService } from 'src/app/Services/products/products.service';
import { AuthService } from 'src/app/Services/auth/auth.service';
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent {
  cartProducts : [] = []
  products!: Product[];
  productId!: string
  isLoading = false
  apiErrorMsg = ''
  isAuthenticated = false
  constructor(private _activatedRoute: ActivatedRoute, private _authService: AuthService, private _cartService : CartService) {
    this._authService.isAuthenticated.subscribe(isAuth =>{
      this.isAuthenticated = isAuth
    })
  }
  ngOnInit() {
    this.apiErrorMsg = ''
    if (this.isAuthenticated) {
      this.isLoading = true
      this._cartService.getLoggedUserCart().pipe(
        map((products: any) => {
          return products.map((product: any) => product.product)
        })
      ).subscribe({
        next: (res: Product[]) => {
          this.products = res;
          console.log(res);

          this.isLoading = false
        },
        error: (err) => {
          this.apiErrorMsg = err.error.errors.msg
          this.isLoading = false
        }
      });
    } else {
      this._cartService.getCartProducts().subscribe(products=>{
        this.products = products.map(prod=>prod.product);
      })
    }

  }


}
