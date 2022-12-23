import { Component, OnInit } from '@angular/core';
import { About } from 'src/app/core/models/about';
import { AboutService } from 'src/app/core/services/about.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  abouts: About[];

  constructor(private aboutClient: AboutService) { }

  ngOnInit(): void {
    debugger;
    this.aboutClient.getAboutInformation().subscribe(aboutInfo=>{
      this.abouts = aboutInfo
    });
  }

}
