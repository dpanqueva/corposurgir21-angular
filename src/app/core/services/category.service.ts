import { Injectable } from '@angular/core';
import {Category} from '../models/category';

import {Observable,of} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import { CATEGORY } from '../DATA/category.json';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private urlEndPoint: string = 'http://localhost:8100/category'
  constructor(private http: HttpClient) { }

  getCategories(): Observable<Category[]>{
   // let category = this.http.get<Category[]>(this.urlEndPoint);
    //return category;
    return of(CATEGORY);
  }
}
