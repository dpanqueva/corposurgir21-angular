import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CategoryFeature } from 'src/app/core/models/category.feature';
import { LoginService } from '../../login.service';
import { MessageService } from '../../message.service';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class CategoryFeaturesService {

  private urlEndPoint: string = environment.base_url + 'category-feature';
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

  getFeaturesById(featureId: string): Observable<CategoryFeature> {
    return this.http.get<CategoryFeature>(this.urlEndPoint.concat("-detail").concat("/").concat(featureId)
      , { headers: this.addAuthorizationHeader() })
      .pipe(
        catchError(e => {
          console.error(e);
          return this.messageService.errorMessage(environment.mensaje_error);
        })
      );
  }

  createFeatures(feature:CategoryFeature): Observable<CategoryFeature>{
    return this.http.post<CategoryFeature>(this.urlEndPoint, feature, { headers: this.addAuthorizationHeader() })
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

  updateFeatures(feature:CategoryFeature, featureId: number): Observable<CategoryFeature>{
    return this.http.put<CategoryFeature>(this.urlEndPoint.concat("/").concat(featureId.toString()), feature, { headers: this.addAuthorizationHeader() })
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

  deleteCategory(feature): Observable<CategoryFeature>{
    return this.http.delete<CategoryFeature>(this.urlEndPoint.concat("/").concat(feature.detalle_id.toString()), { headers: this.addAuthorizationHeader() })
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
