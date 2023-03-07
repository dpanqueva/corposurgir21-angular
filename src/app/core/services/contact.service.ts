import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { AllianceFeatures } from '../models/alliance.features';
import { Contact } from '../models/contact';
import { LoginService } from './login.service';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  private urlEndPoint: string = environment.base_url + 'contact';

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

  constructor( private http: HttpClient,
    private messageService: MessageService,
    private authService: LoginService) { }

  getAllContacts(): Observable<Contact[]> {
    return this.http
      .get<Contact[]>(this.urlEndPoint, {
        headers: this.addAuthorizationHeader(),
      })
      .pipe(catchError((e) => this.errorsApiGenerate(e)));
  }

  getContactId(ContactId: string): Observable<Contact> {
    return this.http
      .get<Contact>(this.urlEndPoint.concat('/').concat(ContactId), {
        headers: this.addAuthorizationHeader(),
      })
      .pipe(catchError((e) => this.errorsApiGenerate(e)));
  }

  createContact(contactItem: Contact): Observable<Contact> {
    return this.http
      .post<Contact>(this.urlEndPoint, contactItem, {
        headers: this.addAuthorizationHeader(),
      })
      .pipe(catchError((e) => this.errorsApiGenerate(e)));
  }

  updateContact(contactItem: Contact, ContactId: string) {
    return this.http
      .put<AllianceFeatures>(
        this.urlEndPoint.concat('/').concat(ContactId),
        contactItem,
        { headers: this.addAuthorizationHeader() }
      )
      .pipe(catchError((e) => this.errorsApiGenerate(e)));
  }

  deleteContact(contactItem: Contact): Observable<Contact> {
    return this.http
      .delete<Contact>(
        this.urlEndPoint
          .concat('/')
          .concat(contactItem.contacto_id.toString()),
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
