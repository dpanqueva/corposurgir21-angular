import { Injectable } from '@angular/core';

import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import { Menu } from '../models/menu';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  private urlEndPoint: string = 'http://localhost:8100/menu'
  constructor(private http: HttpClient) { }

  getMenus(): Observable<Menu[]>{
    let menus = this.http.get<Menu[]>(this.urlEndPoint);
    return menus;
  }
}
