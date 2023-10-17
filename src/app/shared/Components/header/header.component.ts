import { Subscription } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from 'src/app/Services/auth/auth.service';
import { CartService } from 'src/app/Services/cart/cart.service';
interface pages {
  title: string;
  path: string;
}
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  isAuthenticated: boolean = false;
  menuHandler: boolean = true;
  mdOptions: boolean = true;
  search: boolean = true;
  sub! : Subscription
  pages: pages[] = [
    { title: 'home', path: '/' },
    { title: 'cart', path: '/cart' },
    { title: 'products', path: '/products' },
    { title: 'categories', path: '/categories' },
    { title: 'brands', path: '/brands' },
  ];
  cartProductsLength = 0;
  constructor(
    private _authService: AuthService,
    private _cartService: CartService
  ) {
    this._authService.isAuthenticated.subscribe((isAuth) => {
      this.isAuthenticated = isAuth;
    });
  }
 
  menuHandlerBtn() {
    this.menuHandler = !this.menuHandler;
  }
  mdOptionsToggle() {
    this.mdOptions = !this.mdOptions;
  }
  searchToggle() {
    this.search = !this.search;
  }

  ngOnInit(): void {
   this.sub = this._cartService.cartProducts.subscribe({
      next: (res) => {
        this.cartProductsLength = res.products.length;
        console.log(this.cartProductsLength);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  logout() {
    this._authService.logout();
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe()
  }

}
