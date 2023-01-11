import { Injectable } from '@angular/core';

import {Observable, of} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import { Alliance } from '../models/alliance';

import { ALLIANCES } from '../DATA/alliance.json'; 
import { ALLIANCE_FEATURES } from '../DATA/alliance.feature.json';
import { AllianceFeatures } from '../models/alliance.features';

@Injectable({
  providedIn: 'root'
})
export class AllianceService {

  private urlEndPoint: string = 'http://localhost:8100/alliance';

  allianceFeatures: AllianceFeatures[] =[];

  constructor(private http: HttpClient) { }

  getCategories(): Observable<Alliance[]>{
    //let category = this.http.get<Alliance[]>(this.urlEndPoint);
    //return category;
    return of(ALLIANCES);
  }



  /**
   * Consume detail
   */

  getDetail(nombre: string):Observable<Alliance>{
    debugger;
    const alliance = ALLIANCES.find(data=> data.nombre == nombre);
    this.allianceFeatures = ALLIANCE_FEATURES.filter(data => data.alianza_id == alliance.alianza_id  && data.codigo_nombre==alliance.nombre )
    alliance.caracteristicas=this.allianceFeatures;
    return of(alliance);
  }
}
