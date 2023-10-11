import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Brand } from 'src/app/Models/brand';

const BASE_URL = 'https://ecommerce.routemisr.com'

@Injectable({
  providedIn: 'root'
})
export class BrandsService {

  constructor(private httpClient : HttpClient) { }
  getAllBrands() :Observable<Brand[]>{
    return this.httpClient.get<any>(BASE_URL + '/api/v1/brands').pipe(
      map(res => res.data)
    );
  }
  
  getSpecificBrand(id: string) :Observable<Brand>{
    return this.httpClient.get<any>(BASE_URL + '/api/v1/brands/'+ id).pipe(
      map(res => res.data)
    );
  }
}
