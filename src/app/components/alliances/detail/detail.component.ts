import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Alliance } from 'src/app/core/models/alliance';
import { AllianceService } from 'src/app/core/services/alliance.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {

  alliances: Alliance;
  disabled: string = "disabled";

  constructor(private router: Router, private activateRoute: ActivatedRoute
    , private allianceClient: AllianceService ) { }

  ngOnInit(): void {
    
    this.loadAlliancesDetail();
  }

  loadAlliancesDetail(){
    this.activateRoute.params.subscribe(params =>{
      let nombre = params['nombre']
      if(nombre){
        this.allianceClient.getDetail(nombre).subscribe(
          (alliance)=> {
          this.alliances = alliance;
          if(this.alliances.pagina_web != null){
            this.disabled = "";
          }
        });
      }
    });
    
  }

}
