import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartService } from 'src/app/Services/cart/cart.service';
import { AuthService } from 'src/app/Services/auth/auth.service';
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent {
  cartProducts: [] = [];
  products!: any[];
  productId!: string;
  isLoading = false;
  apiErrorMsg = '';
  isAuthenticated = false;
  totalPrice = 0;
  constructor(
    private _activatedRoute: ActivatedRoute,
    private _authService: AuthService,
    private _cartService: CartService
  ) {
    this._authService.isAuthenticated.subscribe((isAuth) => {
      this.isAuthenticated = isAuth;
    });
  }
  ngOnInit() {
    this.apiErrorMsg = '';
    if (this.isAuthenticated) {
      this.isLoading = true;
      this._cartService
        .getLoggedUserCart()
        // .pipe(
        //   map((products: any) => {
        //     return products.products.map((product: any) => product.product)
        //   })
        // )
        .subscribe({
          next: (res: any) => {
            this.products = res.products;
            this.totalPrice = res.totalCartPrice;
            console.log(res);

            this.isLoading = false;
          },
          error: (err) => {
            this.apiErrorMsg = err.error.errors.msg;
            this.isLoading = false;
          },
        });
    } else {
      this._cartService.getCartProducts().subscribe((products) => {
        this.products = products;
        // .map(prod=>prod.product);
      });
    }
  }

  onRemove(productId: string) {
    this._cartService.RemoveSpecificCartItem(productId).subscribe((res) => {
      console.log(res);
      this.products = res.data.products;
      this.totalPrice = res.data.totalCartPrice;
    });
  }
}
