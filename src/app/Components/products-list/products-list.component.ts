import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/Services/products/products.service';
import { Product } from 'src/app/Models/product';
import { BrandsService } from 'src/app/Services/brands/brands.service';
import { Brand } from 'src/app/Models/brand';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss'],
})
export class ProductsListComponent implements OnInit {
  constructor(private _products: BrandsService) {}
  isLoading = false;
  products! : Product[]
  ngOnInit() {
    this.isLoading = true
    this._products.getAllBrands().subscribe((data: any[]) => {      
      console.log(data);
      
    });
    this._products.getSpecificBrand("64089fe824b25627a25315d1").subscribe((data: any) => {      
      console.log(data);
      
    });
  }
  // constructor(private _products: ProductsService) {}
  // isLoading = false;
  // products! : Product[]
  // ngOnInit() {
  //   this.isLoading = true
  //   this._products.getAllProducts().subscribe((data: Product[]) => {      
  //     this.products = data
  //     this.isLoading = false
  //   });
  // }
}
