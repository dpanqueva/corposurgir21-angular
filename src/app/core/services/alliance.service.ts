import { Injectable } from '@angular/core';

import {Observable, of} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import { Alliance } from '../models/alliance';
import { AllianceFeatures } from '../models/alliance.features';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class AllianceService {

  private urlEndPoint: string = environment.base_url + 'alliance';

  constructor(private http: HttpClient) { }

  getCategories(): Observable<Alliance[]>{
    let category = this.http.get<Alliance[]>(this.urlEndPoint);
    return category;
  }

  getDetail(nombre: string):Observable<Alliance>{
    let category = this.http.get<Alliance>(this.urlEndPoint.concat('-feature').concat('/').concat(nombre));
    return category;
  }
}
