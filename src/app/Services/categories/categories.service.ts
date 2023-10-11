import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Category } from 'src/app/Models/category';

const BASE_URL = 'https://ecommerce.routemisr.com'

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor(private httpClient : HttpClient) { }
  getAllCategories() :Observable<Category[]>{
    return this.httpClient.get<any>(BASE_URL + '/api/v1/categories').pipe(
      map(res => res.data)
    );
  }
  
  getSpecificCategory(id: string) :Observable<Category>{
    return this.httpClient.get<any>(BASE_URL + '/api/v1/categories/'+ id).pipe(
      map(res => res.data)
    );
  }
}
