import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { AllianceFeatures } from '../models/alliance.features';
import { Donation } from '../models/donation';
import { LoginService } from './login.service';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root',
})
export class DonationService {
  private urlEndPoint: string = environment.base_url + 'donation';

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

  getAllDonations(): Observable<Donation[]> {
    return this.http
      .get<Donation[]>(this.urlEndPoint, {
        headers: this.addAuthorizationHeader(),
      })
      .pipe(catchError((e) => this.errorsApiGenerate(e)));
  }

  getDonationId(donationId: string): Observable<Donation> {
    return this.http
      .get<Donation>(this.urlEndPoint.concat('/').concat(donationId), {
        headers: this.addAuthorizationHeader(),
      })
      .pipe(catchError((e) => this.errorsApiGenerate(e)));
  }

  createDonation(donationItem: Donation): Observable<Donation> {
    return this.http
      .post<Donation>(this.urlEndPoint, donationItem, {
        headers: this.addAuthorizationHeader(),
      })
      .pipe(catchError((e) => this.errorsApiGenerate(e)));
  }

  updateDonation(donationItem: Donation, donationId: string) {
    return this.http
      .put<AllianceFeatures>(
        this.urlEndPoint.concat('/').concat(donationId),
        donationItem,
        { headers: this.addAuthorizationHeader() }
      )
      .pipe(catchError((e) => this.errorsApiGenerate(e)));
  }

  deleteDonation(donationItem: Donation): Observable<Donation> {
    return this.http
      .delete<Donation>(
        this.urlEndPoint
          .concat('/')
          .concat(donationItem.donacion_id.toString()),
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
