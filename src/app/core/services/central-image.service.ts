import { Injectable } from '@angular/core';

import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import { CentralImage } from '../models/central-image';

@Injectable({
  providedIn: 'root'
})
export class CentralImageService {

  private urlEndPoint: string = 'http://localhost:8100/central-image'
  constructor(private http: HttpClient) { }

  getCentralImages(): Observable<CentralImage[]>{
    let images = this.http.get<CentralImage[]>(this.urlEndPoint);
    return images;
  }
}
