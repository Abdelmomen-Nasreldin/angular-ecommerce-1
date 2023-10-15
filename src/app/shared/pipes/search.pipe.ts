import { Pipe, PipeTransform } from '@angular/core';
import { Product } from 'src/app/Models/product';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(value: Product[], searchText: string): Product[] {
    return value.filter(product => product.title.toLowerCase().includes (searchText.toLowerCase()));
  }

}
