import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { AllianceFeatures } from 'src/app/core/models/alliance.features';
import { environment } from 'src/environments/environment.prod';
import { LoginService } from '../../login.service';
import { MessageService } from '../../message.service';

@Injectable({
  providedIn: 'root',
})
export class AllianceFeaturesService {
  private urlEndPoint: string = environment.base_url + 'alliance-detail';

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

  getAllianceFeaturesByNameAndId(
    name: string,
    allianceId: string
  ): Observable<AllianceFeatures[]> {
    return this.http
      .get<AllianceFeatures[]>(
        this.urlEndPoint
          .concat('/')
          .concat(allianceId)
          .concat('/')
          .concat(name),
        { headers: this.addAuthorizationHeader() }
      )
      .pipe(
        catchError((e) => {
          return this.messageService.errorMessage(e);
        })
      );
  }

  getAllianceFeatureById(featureId: string): Observable<AllianceFeatures> {
    return this.http
      .get<AllianceFeatures>(this.urlEndPoint.concat('/').concat(featureId), {
        headers: this.addAuthorizationHeader(),
      })
      .pipe(catchError((e) => this.errorsApiGenerate(e)));
  }

  createAllianceFeature(featureItem: AllianceFeatures): Observable<AllianceFeatures>{
    return this.http
      .post<AllianceFeatures>(
        this.urlEndPoint,featureItem,
        { headers: this.addAuthorizationHeader() }
      )
      .pipe(catchError((e) => this.errorsApiGenerate(e)));
  }

  updateAllianceFeature(featureItem: AllianceFeatures, featureId:string){
    return this.http
    .put<AllianceFeatures>(
      this.urlEndPoint.concat("/").concat(featureId),featureItem,
      { headers: this.addAuthorizationHeader() }
    )
    .pipe(catchError((e) => this.errorsApiGenerate(e)));
  }

  deleteAllianceFeature(
    featureItem: AllianceFeatures
  ): Observable<AllianceFeatures> {
    return this.http
      .delete<AllianceFeatures>(
        this.urlEndPoint
          .concat('/')
          .concat(featureItem.alianza_caracteristica_id.toString()),
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
