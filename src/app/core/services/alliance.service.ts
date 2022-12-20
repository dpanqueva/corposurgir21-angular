import { Injectable } from '@angular/core';

import {Observable, of} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import { Alliance } from '../models/alliance';

import { ALLIANCES } from '../DATA/alliance.json'; 

@Injectable({
  providedIn: 'root'
})
export class AllianceService {

  private urlEndPoint: string = 'http://localhost:8100/alliance';

  constructor(private http: HttpClient) { }

  getCategories(): Observable<Alliance[]>{
    //let category = this.http.get<Alliance[]>(this.urlEndPoint);
    //return category;
    return of(ALLIANCES);
  }
}
