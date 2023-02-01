import { Injectable } from '@angular/core';

import {Observable, of} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import { About } from '../models/about';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class AboutService {

  private urlEndPoint: string = environment.base_url + 'about-info';

  constructor(private http: HttpClient) { }

  getAboutInformation(): Observable<About[]>{
     let about = this.http.get<About[]>(this.urlEndPoint);
    return about;
    //return of(ABOUT);
  }
}
