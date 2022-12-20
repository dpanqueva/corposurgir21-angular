import { Injectable } from '@angular/core';

import {Observable,of} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import { CompanyInfo } from '../models/company-info';

import { FOOTER } from '../DATA/footer.json';

@Injectable({
  providedIn: 'root'
})
export class CompanyInfoService {

  private urlEndPoint: string = 'http://localhost:8100/company-info'
  constructor(private http: HttpClient) { }

  getCompanyInfo(): Observable<CompanyInfo[]>{
    //let info = this.http.get<CompanyInfo[]>(this.urlEndPoint);
    //return info;
    return of(FOOTER);
  }
}
