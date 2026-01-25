import { Injectable } from '@angular/core';

import { catchError, Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Alliance } from '../../../models/alliance';
import { environment } from 'src/environments/environment.prod';
import { MessageService } from '../../message.service';
import { LoginService } from '../../login.service';

@Injectable({
  providedIn: 'root',
})
export class AllianceService {
  private urlEndPoint: string = environment.base_url + 'alliance';

  private httpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
  });

  private addAuthorizationHeader() {
    let token = this.authService.token;
    if (token != null) {
      return this.httpHeaders.append('Authorization', token);
    }
    return this.httpHeaders;
  }

  constructor(
    private http: HttpClient,
    private messageService: MessageService,
    private authService: LoginService
  ) {}

  getAllAlliances(): Observable<Alliance[]> {
    return this.http.get<Alliance[]>(this.urlEndPoint).pipe(
      catchError((e) => {
        return this.messageService.errorMessage(e);
      })
    );
  }

getAllianceById(allianceId: string): Observable<Alliance> {
  return this.http
    .get<Alliance>(this.urlEndPoint.concat('/').concat(allianceId), {
      headers: this.addAuthorizationHeader()
    })
    .pipe(
      catchError((e) => {
        return this.messageService.errorMessage(e);
      })
    );
}

  getDetail(nombre: string): Observable<Alliance> {
    return this.http
      .get<Alliance>(
        this.urlEndPoint.concat('-feature').concat('/').concat(nombre)
      )
      .pipe(catchError((e) => this.errorsApiGenerate(e)));
  }

  createAlliance(alliance: FormData): Observable<Alliance> {
    return this.http
      .post<Alliance>(this.urlEndPoint, alliance, {
        headers: new HttpHeaders({
          Authorization: this.authService.token,
        }),
      })
      .pipe(catchError((e) => this.errorsApiGenerate(e)));
  }

  updateAlliance(alliance: Alliance): Observable<Alliance> {
    return this.http
      .put<Alliance>(
        this.urlEndPoint.concat('/').concat(alliance.alianza_id.toString()),
        alliance,
        { headers: this.addAuthorizationHeader() }
      )
      .pipe(catchError((e) => this.errorsApiGenerate(e)));
  }

  updateImage(alliance: FormData, allianceId: string): Observable<Alliance> {
    return this.http
      .post<Alliance>(
        this.urlEndPoint.concat('/').concat(allianceId),
        alliance,
        {
          headers: new HttpHeaders({
            Authorization: this.authService.token,
          }),
        }
      )
      .pipe(catchError((e) => this.errorsApiGenerate(e)));
  }

  deleteAlliance(alliance: Alliance): Observable<Alliance> {
    return this.http
      .delete<Alliance>(
        this.urlEndPoint.concat('/').concat(alliance.alianza_id.toString()),
        { headers: this.addAuthorizationHeader() }
      )
      .pipe(catchError((e) => this.errorsApiGenerate(e)));
  }

  private errorsApiGenerate(e: any) {
    if (e.status == 400) {
      return throwError(() => e);
    }
    if (e.status == 404) {
      return this.messageService.errorMessage(
        environment.mensaje_no_encontrado
      );
    }
    if (e.status == 500) {
      return this.messageService.errorMessage(
        environment.mensaje_internal_error
      );
    }
    return this.messageService.errorMessage(environment.mensaje_error);
  }
}
