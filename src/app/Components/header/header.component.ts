import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/Services/auth/auth.service';
import { CartService } from 'src/app/Services/cart/cart.service';
interface pages {
  title: string;
  path: string
}
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  isAuthenticated: boolean =false
  menuHandler: boolean = true;
  mdOptions: boolean = true;
  search: boolean = true;
  pages: pages[] = [
    {title: 'home', path: '/'},
    {title: 'cart', path: '/cart'},
    {title: 'products', path: '/products'},
    {title: 'categories', path: '/categories'},
    {title: 'brands', path: '/brands'},
  ]
  cartProductsLength = 0;
  constructor(private _authService: AuthService, private _cartService : CartService) {
    this._authService.isAuthenticated.subscribe(isAuth =>{
      this.isAuthenticated = isAuth

    })

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
    if (this.isAuthenticated) {
      this._cartService.getCartProducts().subscribe({
        next: (res)=>{
          this.cartProductsLength = res.length
          console.log(this.cartProductsLength);
        },
        error: (err)=>{
          console.log(err);

        }
      })
    } else {
      this._cartService.getCartProducts().subscribe({
        next: (res)=>{
          this.cartProductsLength = res.length
          console.log(this.cartProductsLength);
        },
        error: (err)=>{
          console.log(err);
        }
      })
    }
  }
  logout(){
    this._authService.logout()
    this._cartService.emptyCart()
  }
}
