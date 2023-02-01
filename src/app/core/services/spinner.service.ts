import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable({
  providedIn: 'root'
})
export class SpinnerService {

  constructor(private spinnerLoadService: NgxSpinnerService) { }


  public startSpinner(){
    this.spinnerLoadService.show();
  }

  public stoptSpinner(){
    this.spinnerLoadService.hide();
  }
}
