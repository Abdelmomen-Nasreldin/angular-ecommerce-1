import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/app/Models/product';
import { CartService } from './../../Services/cart/cart.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent {
  @Input() product!: Product;
  constructor(private _router: Router,private _cartService: CartService) {}
  goToDetails(productId: string) {
    this._router.navigate(['/productDetails/', productId]);
  }

  addToCart(productId: string) {
    this._cartService.setCartProducts(productId);
  }
}




