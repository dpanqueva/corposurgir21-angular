import { Injectable } from '@angular/core';

import {Observable, of} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import { Menu } from '../models/menu';
import { MENU } from '../DATA/menu.json';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  private urlEndPoint: string = environment.base_url + 'menu'
  constructor(private http: HttpClient) { }

  getMenus(): Observable<Menu[]>{
    //let menus = this.http.get<Menu[]>(this.urlEndPoint);
    //return menus;
    return of(MENU);
  }
}
