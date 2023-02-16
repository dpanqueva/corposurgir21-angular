import { Injectable } from '@angular/core';

import { catchError, Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CompanyInfo } from '../models/company-info';
import { environment } from 'src/environments/environment.prod';
import { MessageService } from './message.service';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class CompanyInfoService {

  private httpHeaders = new HttpHeaders({
    'Content-Type': 'application/json'
  });

  private urlEndPoint: string = environment.base_url + 'company-info'
  constructor(private http: HttpClient, private messageService: MessageService
    , private authService: LoginService) { }

  private addAuthorizationHeader() {
    let token = this.authService.token;
    if (token != null) {
      return this.httpHeaders.append('Authorization', token);
    }
    return this.httpHeaders;
  }

  getCompanyInfoAll(): Observable<CompanyInfo[]> {
    return this.http.get<CompanyInfo[]>(this.urlEndPoint)
    .pipe(
      catchError(e => {
        if (e.status == 400) {
          return throwError(() => e);
        }
        if (e.status == 404) {
          this.messageService.errorMessage(environment.mensaje_no_encontrado);
        }
        if (e.status == 500) {
          this.messageService.errorMessage(environment.mensaje_internal_error);
        }
        return this.messageService.errorMessage(environment.mensaje_error);
      })
    );
  }

  getCompanyInfo(companyId: string): Observable<CompanyInfo> {
    console.log(this.urlEndPoint.concat('-feature').concat('/').concat(companyId));
    return this.http.get<CompanyInfo>(this.urlEndPoint.concat('-feature').concat('/').concat(companyId))
    .pipe(
      catchError(e => {
        if (e.status == 400) {
          return throwError(() => e);
        }
        if (e.status == 404) {
          this.messageService.errorMessage(environment.mensaje_no_encontrado);
        }
        if (e.status == 500) {
          this.messageService.errorMessage(environment.mensaje_internal_error);
        }
        return this.messageService.errorMessage(environment.mensaje_error);
      })
    );
  }

  createAboutInformation(infoCompany: CompanyInfo): Observable<CompanyInfo>{
    return this.http.post<CompanyInfo>(this.urlEndPoint, infoCompany,{ headers: this.addAuthorizationHeader() })
      .pipe(
        catchError(e => {
          if (e.status == 400) {
            return throwError(() => e);
          }
          if (e.status == 404) {
            this.messageService.errorMessage(environment.mensaje_no_encontrado);
          }
          if (e.status == 500) {
            this.messageService.errorMessage(environment.mensaje_internal_error);
          }
          return this.messageService.errorMessage(environment.mensaje_error);
        })
      );
  }

  updateAboutInformation(companyId: number, infoCompany: CompanyInfo):Observable<CompanyInfo>{
    return this.http.put<CompanyInfo>(this.urlEndPoint.concat("/").concat(companyId.toString()), infoCompany,{ headers: this.addAuthorizationHeader() })
    .pipe(
      catchError(e => {
        if (e.status == 400) {
          return throwError(() => e);
        }
        if (e.status == 404) {
          this.messageService.errorMessage(environment.mensaje_no_encontrado);
        }
        if (e.status == 500) {
          this.messageService.errorMessage(environment.mensaje_internal_error);
        }
        return this.messageService.errorMessage(environment.mensaje_error);
      })
    );
  }

  deleteCompanyInfo(infoItem: CompanyInfo): Observable<CompanyInfo> {
    return this.http.delete<CompanyInfo>(this.urlEndPoint.concat("/").concat(infoItem.info_empresa_id.toString()), { headers: this.addAuthorizationHeader() })
      .pipe(
        catchError(e => {
          if (e.status == 400) {
            return throwError(() => e);
          }
          if (e.status == 404) {
            this.messageService.errorMessage(environment.mensaje_no_encontrado);
          }
          if (e.status == 500) {
            this.messageService.errorMessage(environment.mensaje_internal_error);
          }
          return this.messageService.errorMessage(environment.mensaje_error);
        })
      );
  }
}

