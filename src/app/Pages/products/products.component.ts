import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/Models/product';
import { ProductsService } from 'src/app/Services/products/products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit{
  searchText : string = ''
  isLoading = false;
  products : Product[] = []
  constructor(private _products: ProductsService) {}
  ngOnInit() {
    this.isLoading = true
    this._products.getAllProducts().subscribe((data: Product[]) => {
      this.products = data
      this.isLoading = false
    });
  }
}
