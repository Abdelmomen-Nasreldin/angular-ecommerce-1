import { map } from 'rxjs';
import { OrdersService } from 'src/app/Services/orders/orders.service';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { CartService } from 'src/app/Services/cart/cart.service';
import { AuthService } from 'src/app/Services/auth/auth.service';
import { SharedModule } from 'src/app/shared/shared.module';

@Component({
  selector: 'app-allorders',
  standalone: true,
  imports: [CommonModule, SharedModule],
  templateUrl: './allorders.component.html',
  styleUrls: ['./allorders.component.scss']
})
export class AllordersComponent implements OnInit {

  ngOnInit(): void {
    this._ordersService.getAllOrders().subscribe({
      next: (res: any) => {
        this.products = res.map((prods:any)=> prods.cartItems[0])
        console.log(res);
        console.log(this.products);
      }, error: (err) => {
        console.log(err);
      }
    })

  }
  cartProducts: [] = [];
  products!: any[];
  productId!: string;
  isLoading = false;
  apiErrorMsg = '';
  isAuthenticated = false;
  totalPrice = 0;
  cartId!: string
  constructor(
    private _ordersService: OrdersService,
    private _authService: AuthService,
    private _cartService: CartService,
    private _router: Router,
  ) {
    this._authService.isAuthenticated.subscribe((isAuth) => {
      this.isAuthenticated = isAuth;
    });
  }

  onRemove(productId: string) {
    this._cartService.RemoveCartProduct(productId).subscribe((res) => {
      this.products = res.products;
      this.totalPrice = res.totalCartPrice;
      console.log(res, this.products);
    });
  }

}
