import { Component, OnInit } from '@angular/core';
import { CompanyInfo } from 'src/app/core/models/company-info';
import { CompanyInfoService } from 'src/app/core/services/company-info.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  infoCompany: CompanyInfo;

  constructor(private companyInfoClient: CompanyInfoService) { }

  ngOnInit(): void {
    this.companyInfoClient.getCompanyInfo('1').subscribe(
      info =>{
       this.infoCompany = info;
      }
    );
  }

}
