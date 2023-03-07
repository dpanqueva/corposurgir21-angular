import { Component, OnInit } from '@angular/core';
import { Alliance } from 'src/app/core/models/alliance';
import { AllianceService } from 'src/app/core/services/alliances/principal/alliance.service';

@Component({
  selector: 'app-alliances',
  templateUrl: './alliances.component.html',
  styleUrls: ['./alliances.component.css']
})
export class AlliancesComponent implements OnInit {

  alliances: Alliance[];

  constructor(private allianceClient: AllianceService) { }

  ngOnInit(): void {
    this.allianceClient.getAllAlliances().subscribe(
      category =>{
        this.alliances = category;
      }
    );
  }



}
