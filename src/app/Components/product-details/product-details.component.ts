import { Component, Input } from '@angular/core';
import { Product } from 'src/app/interfaces/product';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent {
   product: Product
constructor(){
this.product = {
  "sold": 193,
  "images": [
      "https://res.cloudinary.com/dwp0imlbj/image/upload/Route-Academy-products/1678301723376-3.jpeg",
      "https://res.cloudinary.com/dwp0imlbj/image/upload/Route-Academy-products/1678301723375-2.jpeg",
      "https://res.cloudinary.com/dwp0imlbj/image/upload/Route-Academy-products/1678301723376-4.jpeg",
      "https://res.cloudinary.com/dwp0imlbj/image/upload/Route-Academy-products/1678301723375-1.jpeg",
      "https://res.cloudinary.com/dwp0imlbj/image/upload/Route-Academy-products/1678301723377-5.jpeg",
      "https://res.cloudinary.com/dwp0imlbj/image/upload/Route-Academy-products/1678301723377-6.jpeg"
  ],
  "subcategory": [
      {
          "_id": "6407f3a8b575d3b90bf957e2",
          "name": "Laptops & Accessories",
          "slug": "laptops-and-accessories",
          "category": "6439d2d167d9aa4ca970649f"
      }
  ],
  "ratingsQuantity": 6,
  "_id": "6408da1c6406cd15828e8f0a",
  "title": "Victus 16-D1016Ne Laptop With 16-Inch Display Core I7-12700H Processor 16Gb Ram 1Tb Nvidia Geforce Rtx3050 Ti Graphics English/Arabic Ceramic White",
  "slug": "victus-16-d1016ne-laptop-with-16-inch-display-core-i7-12700h-processor-16gb-ram-1tb-nvidia-geforce-rtx3050-ti-graphics-englisharabic-ceramic-white",
  "description": "NVIDIA GeForce RTX 3060, 6 GB GDDR6\n15.6\", FHD 1920x1080, 120Hz, Non-Touch, AG, WVA, LED-Backlit, 300 nit, Narrow Border\n16 GB, 2 x 8 GB, DDR5, 4800 MHz, dual-channel\n512GB M.2 PCIe NVMe Solid State Drive, Nahimic 3D Audio\nOffice Home & Student 2021, US English orange qwerty backlit keyboard with numeric keypad and G-key",
  "quantity": 253,
  "price": 42960,
  "availableColors": [],
  "imageCover": "https://res.cloudinary.com/dwp0imlbj/image/upload/v1680747398/Route-Academy-products/1678301723274-cover.jpeg",
  "category": {
      "_id": "6439d2d167d9aa4ca970649f",
      "name": "Electronics",
      "slug": "electronics",
      "image": "https://res.cloudinary.com/dwp0imlbj/image/upload/v1680747343/Route-Academy-categories/1681511121316.png"
  },
  "brand": {
      "_id": "64089faf24b25627a25315cd",
      "name": "Dell",
      "slug": "dell",
      "image": "https://res.cloudinary.com/dwp0imlbj/image/upload/v1680747186/Route-Academy-brands/1678286767914.png"
  },
  "ratingsAverage": 4.3,
  "createdAt": "2023-03-08T18:55:24.096Z",
  "updatedAt": "2023-09-15T05:30:30.439Z",
  "id": "6408da1c6406cd15828e8f0a"
}
}
}
