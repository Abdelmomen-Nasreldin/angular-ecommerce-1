import { Component } from '@angular/core';
import { ProductsService } from './Services/products/products.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ecommerce1';
  constructor(private _productService : ProductsService){
    this._productService.setProducts()?.subscribe(res => console.log(res) )
  }
}
