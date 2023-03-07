import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { CompanyInfoFeatures } from 'src/app/core/models/company.info.features';
import { environment } from 'src/environments/environment.prod';
import { LoginService } from '../../login.service';
import { MessageService } from '../../message.service';

@Injectable({
  providedIn: 'root',
})
export class SocialMediaService {
  private httpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
  });

  private urlEndPoint: string = environment.base_url + 'social-media';

  constructor(
    private http: HttpClient,
    private messageService: MessageService,
    private authService: LoginService
  ) {}

  private addAuthorizationHeader() {
    let token = this.authService.token;
    if (token != null) {
      return this.httpHeaders.append('Authorization', token);
    }
    return this.httpHeaders;
  }

  getSocialMediaAll(): Observable<CompanyInfoFeatures[]> {
    return this.http
      .get<CompanyInfoFeatures[]>(this.urlEndPoint, {
        headers: this.addAuthorizationHeader(),
      })
      .pipe(catchError((e) => this.errorsApiGenerate(e)));
  }

  getSocialMediaById(
    socialId: number
  ): Observable<CompanyInfoFeatures> {
    return this.http
      .get<CompanyInfoFeatures>(
        this.urlEndPoint.concat('/').concat(socialId.toString()),
        { headers: this.addAuthorizationHeader() }
      )
      .pipe(catchError((e) => this.errorsApiGenerate(e)));
  }

  createSocialMedia(
    companyInfoFeatures: CompanyInfoFeatures
  ): Observable<CompanyInfoFeatures> {
    companyInfoFeatures.info_empresa_id = 1;
    return this.http
      .post<CompanyInfoFeatures>(this.urlEndPoint, companyInfoFeatures, {
        headers: this.addAuthorizationHeader(),
      })
      .pipe(catchError((e) => this.errorsApiGenerate(e)));
  }

  updateSocialMedia(
    companyInfoFeatures: CompanyInfoFeatures
  ): Observable<CompanyInfoFeatures> {
    return this.http
      .put<CompanyInfoFeatures>(
        this.urlEndPoint.concat('/').concat(companyInfoFeatures.red_social_id.toString()),
        companyInfoFeatures,
        { headers: this.addAuthorizationHeader() }
      )
      .pipe(catchError((e) => this.errorsApiGenerate(e)));
  }

  deleteSocialMedia(
    social: CompanyInfoFeatures
  ): Observable<CompanyInfoFeatures> {
    return this.http
      .delete<CompanyInfoFeatures>(
        this.urlEndPoint.concat('/').concat(social.red_social_id.toString()),
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
