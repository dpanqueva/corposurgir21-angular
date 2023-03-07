import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-back-page',
  templateUrl: './back-page.component.html',
  styleUrls: ['./back-page.component.css']
})
export class BackPageComponent implements OnInit {

  constructor(private _location: Location) { }

  ngOnInit(): void {
  }

  backPage() {
    this._location.back();
  }
}
