import { Subscription } from 'rxjs';
import { Component, Input, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/app/Models/product';
import { CartService } from './../../Services/cart/cart.service';
import { ToastersService } from 'src/app/Services/toasters/toasters.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent implements OnDestroy {
  @Input() product!: Product;
  constructor(private _router: Router, private _cartService: CartService, private _toastersService: ToastersService) { }
  sub!: Subscription
 
  goToDetails(productId: string) {
    this._router.navigate(['/productDetails/', productId]);
  }

  addToCart(product: Product) {
    this.sub = this._cartService.setCartProducts(product).subscribe()
  }
  ngOnDestroy(): void {
    if (this.sub) { 
      this.sub.unsubscribe()
    }
    }
}
