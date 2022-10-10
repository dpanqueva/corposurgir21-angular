import { Component, OnInit } from '@angular/core';
import { CompanyInfo } from 'src/app/core/models/company-info';
import { CompanyInfoService } from 'src/app/core/services/company-info.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  left:CompanyInfo[];
  right: CompanyInfo[];

  constructor(private companyInfoClient: CompanyInfoService) { }

  ngOnInit(): void {
    this.companyInfoClient.getCompanyInfo().subscribe(
      info =>{
        this.left=info.filter(leftP => leftP.posicion == 'IZQUIERDA');
        this.right=info.filter(rigthP => rigthP.posicion == 'DERECHA');
      }
    );
  }

}
