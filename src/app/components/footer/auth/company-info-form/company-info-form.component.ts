import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CompanyInfo } from 'src/app/core/models/company-info';
import { CompanyInfoService } from 'src/app/core/services/company-info.service';
import { MessageService } from 'src/app/core/services/message.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-company-info-form',
  templateUrl: './company-info-form.component.html',
  styleUrls: ['./company-info-form.component.css']
})
export class CompanyInfoFormComponent implements OnInit {

  companyInfo: CompanyInfo = new CompanyInfo();
  errors: string[] = [];

  constructor(private companyService: CompanyInfoService, private router: Router
    , private messageService: MessageService, private activateRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.loadAboutInformationItem();
  }

  loadAboutInformationItem() {
    this.activateRoute.params.subscribe(params => {
      let companyId = params['companyId'];
      if (companyId) {
        this.companyService.getCompanyInfo(companyId).subscribe((infoCompany) => this.companyInfo = infoCompany);
      }
    });
  }

  createAboutInformation() {
    this.companyService.createAboutInformation(this.companyInfo)
      .subscribe(
        {
          next: (e) => {
            this.messageService.successFullMessage(environment.mensaje_creado_ok);
            this.router.navigate(['/modulo-informacion-empresa']);
          },
          error: (e) => {
            if (e.status == 400) {
              this.validateErrors(e);
            }
          }
        });
  }

  updateAboutInformation() {
    this.companyService.updateAboutInformation(this.companyInfo.info_empresa_id, this.companyInfo)
      .subscribe(
        {
          next: (e) => {
            this.messageService.successFullMessage(environment.mensaje_editado_ok);
            this.router.navigate(['/modulo-informacion-empresa']);
          },
          error: (e) => {
            if (e.status == 400) {
              this.validateErrors(e);
            }
          }
        });
  }


  private validateErrors(e: any) {
    this.errors[0] = e.error.error.nombre_empresa as string;
    this.errors[1] = e.error.error.direccion as string;
    this.errors[2] = e.error.error.ciudad_pais as string;
    this.errors[3] = e.error.error.numero_fijo as string;
    this.errors[4] = e.error.error.numero_celular as string;
    this.errors[5] = e.error.error.correo as string;
  }
}
