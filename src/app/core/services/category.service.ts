import { Injectable } from '@angular/core';
import {Category} from '../models/category';

import {Observable,of} from 'rxjs';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private urlEndPoint: string = 'http://localhost:8100/category'
    
  constructor(private http: HttpClient) { }

  getCategories(): Observable<Category[]>{
   let category = this.http.get<Category[]>(this.urlEndPoint);
   return category;
  }

  getDetail(nombre: string):Observable<Category>{
    let category = this.http.get<Category>(this.urlEndPoint.concat('-feature').concat('/').concat(nombre));
    return category;
  }
}
