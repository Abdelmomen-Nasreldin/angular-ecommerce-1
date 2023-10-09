import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/Services/products/products.service';
import { Product } from 'src/app/interfaces/product';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss'],
})
export class ProductsListComponent implements OnInit {
  constructor(private _products: ProductsService) {}
  products! : Product[]
  ngOnInit() {
    this._products.getProducts().subscribe((res: any) => {
      console.log('====================================');
      console.log(res.data);
      this.products = res.data
    });
  }
}
