import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { Login } from '../models/login';
import { User } from '../models/user';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  [x: string]: any;

  private _user: User = null;
  private _token: string = null;

  private httpHeaders = new HttpHeaders(
    {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  );

  private urlEndPoint: string = environment.base_url + 'users';

  constructor(private http: HttpClient, private errorService: MessageService) { }

  public get user(): User {

    if (this._user != null) {
      return this._user;
    } else if (this._user == null && sessionStorage.getItem('user') != null) {
      this._user = JSON.parse(sessionStorage.getItem('user')) as User;
      return this._user;
    }
    return new User();

  }

  public get token(): string {
    if (this._token != null) {
      return this._token;
    } else if (this._token == null && sessionStorage.getItem('api_token') != null) {
      this._token = sessionStorage.getItem('api_token');
      return this._token;
    }
    return null;

  }

  accessLogin(login: Login): Observable<User> {
    let params = new URLSearchParams();
    params.set('correo', login.correo);
    params.set('clave', login.clave);
    return this.http.post<User>(this.urlEndPoint.concat('/login'), params, { headers: this.httpHeaders })
    .pipe(catchError((e) => this.errorsApiGenerate(e)));
  }

  saveUser(userAuth: User): void {
    this._user = userAuth;
    sessionStorage.setItem('user', JSON.stringify(this._user));
  }

  saveToken(userAuth: User): void {

    this._token = userAuth.api_token;
    sessionStorage.setItem('api_token', this._token);
  }

  isAuthenticated(): boolean {
    if (this.token != null && this.user.api_token != null) {
      return true;
    }
    return false;
  }

  logout(): Observable<void> {
    const httpHeadersLogout = new HttpHeaders(
      {
        'Content-Type': 'application/json',
        'Authorization': this.user.api_token
      }
    );
    var response = this.http.post<void>(this.urlEndPoint.concat('/logout'), this.user, { headers: httpHeadersLogout })
    .pipe(catchError((e) => this.errorsApiGenerate(e)));
    this._token = null;
    this._user = null;
    sessionStorage.clear();
    return response;
  }

  private errorsApiGenerate(e: any) {
    if (e.status == 400) {
      return throwError(() => e);
    }
    if (e.status == 404) {
      return this.errorService.errorMessage(
        environment.mensaje_no_encontrado
      );
    }
    if (e.status == 500) {
      return this.errorService.errorMessage(
        environment.mensaje_internal_error
      );
    }
    return this.errorService.errorMessage(environment.mensaje_error);
  }
}
