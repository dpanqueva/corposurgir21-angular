import { Injectable } from '@angular/core';
import { Category } from 'src/app/core/models/category';

import { catchError, Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';
import { MessageService } from '../../message.service';
import { LoginService } from '../../login.service';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private urlEndPoint: string = environment.base_url + 'category';

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

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(this.urlEndPoint, { headers: this.addAuthorizationHeader() })
    .pipe(catchError((e) => this.errorsApiGenerate(e)));
  }

  getDetail(nombre: string): Observable<Category> {
    return this.http.get<Category>(this.urlEndPoint.concat('-feature').concat('/').concat(nombre), { headers: this.addAuthorizationHeader() })
    .pipe(catchError((e) => this.errorsApiGenerate(e)));
  }

  getCategoryById(categoryName: string): Observable<Category> {
    return this.http.get<Category>(this.urlEndPoint.concat("/").concat(categoryName), { headers: this.addAuthorizationHeader() })
    .pipe(catchError((e) => this.errorsApiGenerate(e)));
  }

  createCategory(category: Category): Observable<Category> {
    return this.http.post<Category>(this.urlEndPoint, category, { headers: this.addAuthorizationHeader() })
    .pipe(catchError((e) => this.errorsApiGenerate(e)));
  }

  updateCategory(category: Category, categoryId: any): Observable<Category>{
    return this.http.put<Category>(this.urlEndPoint.concat("/").concat(categoryId), category, { headers: this.addAuthorizationHeader() })
    .pipe(catchError((e) => this.errorsApiGenerate(e)));
  }

  deleteCategory(category: Category):Observable<Category>{
    return this.http.delete<Category>(this.urlEndPoint.concat("/").concat(category.categoria_id.toString()), { headers: this.addAuthorizationHeader() })
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
