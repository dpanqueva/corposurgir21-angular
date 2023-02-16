import { Injectable } from '@angular/core';

import {catchError, Observable, of} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import { Alliance } from '../models/alliance';
import { environment } from 'src/environments/environment.prod';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root'
})
export class AllianceService {

  private urlEndPoint: string = environment.base_url + 'alliance';

  constructor(private http: HttpClient,private messageService: MessageService) { }

  getCategories(): Observable<Alliance[]>{
    let category = this.http.get<Alliance[]>(this.urlEndPoint).pipe(
      catchError(e =>{
        return this.messageService.errorMessage(e);
      })
     );;
    return category;
  }

  getDetail(nombre: string):Observable<Alliance>{
    let category = this.http.get<Alliance>(this.urlEndPoint.concat('-feature').concat('/').concat(nombre))
    .pipe(
      catchError(e =>{
        console.error(e);
        return this.messageService.errorMessage(environment.mensaje_error);
      })
     );;
    return category;
  }
}
