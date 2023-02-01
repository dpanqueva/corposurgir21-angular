import { Injectable } from '@angular/core';

import {Observable,of} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import { CompanyInfo } from '../models/company-info';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class CompanyInfoService {

  private urlEndPoint: string = environment.base_url + 'company-info'
  constructor(private http: HttpClient) { }

  getCompanyInfo(): Observable<CompanyInfo>{
    let info = this.http.get<CompanyInfo>(this.urlEndPoint.concat('-feature').concat('/').concat('1'));
    return info;
  }
}
