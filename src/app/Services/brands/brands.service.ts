import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Brand } from 'src/app/Models/brand';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BrandsService {

  constructor(private httpClient : HttpClient) { }
  getAllBrands() :Observable<Brand[]>{
    return this.httpClient.get<any>(environment.BASE_URL + '/api/v1/brands').pipe(
      map(res => res.data)
    );
  }
  
  getSpecificBrand(id: string) :Observable<Brand>{
    return this.httpClient.get<any>(environment.BASE_URL + '/api/v1/brands/'+ id).pipe(
      map(res => res.data)
    );
  }
}
