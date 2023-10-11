import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/Services/products/products.service';
import { Product } from 'src/app/Models/product';


@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss'],
})
export class ProductsListComponent implements OnInit {
  constructor(private _products: ProductsService) {}
  isLoading = false;
  products! : Product[]
  ngOnInit() {
    this.isLoading = true
    this._products.getAllProducts().subscribe((data: Product[]) => {
      this.products = data
      this.isLoading = false
    });
  }
}
