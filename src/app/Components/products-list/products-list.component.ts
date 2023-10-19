import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductsService } from 'src/app/Services/products/products.service';
import { Product } from 'src/app/Models/product';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss'],
})
export class ProductsListComponent implements OnInit, OnDestroy {
  sub!: Subscription
  constructor(private _products: ProductsService) { }


  isLoading = false;
  products!: Product[]
  ngOnInit() {
    this.isLoading = true
    this._products.getProducts().subscribe({
      next: (data: Product[]) => {
        if (data.length) {
          this.products = data
          this.isLoading = false
        }
      }, error: (err) => {
        console.log(err);
      }
    });
  }

  ngOnDestroy(): void {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }
}
