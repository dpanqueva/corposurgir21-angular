import { Injectable } from '@angular/core';

import {Observable, of} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import { CentralImage } from '../models/central-image';
import { IMAGECENTRAL } from '../DATA/image.central.json';

@Injectable({
  providedIn: 'root'
})
export class CentralImageService {

  private urlEndPoint: string = 'http://localhost:8100/central-image'
  constructor(private http: HttpClient) { }

  getCentralImages(): Observable<CentralImage[]>{
    //let images = this.http.get<CentralImage[]>(this.urlEndPoint);
    //return images;
    return of(IMAGECENTRAL);
  }
}
