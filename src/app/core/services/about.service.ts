import { Injectable } from '@angular/core';

import { catchError, Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { About } from '../models/about';
import { environment } from 'src/environments/environment.prod';
import { MessageService } from './message.service';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class AboutService {

  private urlEndPoint: string = environment.base_url + 'about-info';

  private httpHeaders = new HttpHeaders({
    'Content-Type': 'application/json'
  });


  constructor(private http: HttpClient, private messageService: MessageService
    , private authService: LoginService) { }

  private addAuthorizationHeader() {
    let token = this.authService.token;
    if (token != null) {
      return this.httpHeaders.append('Authorization', token);
    }
    return this.httpHeaders;
  }

  getAboutInformation(): Observable<About[]> {
    return this.http.get<About[]>(this.urlEndPoint, { headers: this.addAuthorizationHeader() })
    .pipe(
      catchError(e => {
        console.error(e);
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

  getAboutInformationById(aboutId: string): Observable<About>{
    return this.http.get<About>(this.urlEndPoint.concat("/").concat(aboutId), { headers: this.addAuthorizationHeader() })
    .pipe(
      catchError(e => {
        console.error(e);
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

  createAboutInformation(about: About): Observable<About> {
    return this.http.post<About>(this.urlEndPoint, about, { headers: this.addAuthorizationHeader() })
      .pipe(
        catchError(e => {
          console.error(e);
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

  updateAboutInformation(aboutId: number, about:About): Observable<About>{
    return this.http.put<About>(this.urlEndPoint.concat("/").concat(aboutId.toString()), about, { headers: this.addAuthorizationHeader() })
    .pipe(
      catchError(e => {
        console.error(e);
        if (e.status == 400) {
          return throwError(() => e);
        }
        if(e.status == 404){
          this.messageService.errorMessage(environment.mensaje_no_encontrado);
        }
        if(e.status == 500){
          this.messageService.errorMessage(environment.mensaje_internal_error);
        }
        
        return this.messageService.errorMessage(environment.mensaje_error);
      })
    );
  }

  deleteAboutInformation(about: About):Observable<About>{
    return this.http.delete<About>(this.urlEndPoint.concat("/").concat(about.quienes_somos_id.toString()), { headers: this.addAuthorizationHeader() })
    .pipe(
      catchError(e => {
        if (e.status == 400) {
          return throwError(() => e);
        }
        if(e.status == 404){
          this.messageService.errorMessage(environment.mensaje_no_encontrado);
        }
        if(e.status == 500){
          this.messageService.errorMessage(environment.mensaje_internal_error);
        }
        return this.messageService.errorMessage(environment.mensaje_error);
      })
    );
  }
}
