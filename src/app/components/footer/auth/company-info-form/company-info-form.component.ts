import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CompanyInfo } from 'src/app/core/models/company-info';
import { CompanyInfoService } from 'src/app/core/services/company/principal/company-info.service';
import { MessageService } from 'src/app/core/services/message.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-company-info-form',
  templateUrl: './company-info-form.component.html',
  styleUrls: ['./company-info-form.component.css'],
})
export class CompanyInfoFormComponent implements OnInit {
  companyInfo: CompanyInfo = new CompanyInfo();
  errors: string[] = [];

  constructor(
    private companyService: CompanyInfoService,
    private router: Router,
    private messageService: MessageService,
    private activateRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.loadAboutInformationItem();
  }

  loadAboutInformationItem() {
    this.activateRoute.params.subscribe((params) => {
      let companyId = params['companyId'];
      if (companyId) {
        this.companyService
          .getCompanyInfo(companyId)
          .subscribe((infoCompany) => (this.companyInfo = infoCompany));
      }
    });
  }

  createAboutInformation() {
    this.companyService.createAboutInformation(this.companyInfo).subscribe({
      next: (e) => {
        this.messageService.successFullMessage(environment.mensaje_creado_ok);
        this.router.navigate(['/modulo-informacion-empresa']);
      },
      error: (e) => {
        this.errorBadRequest(e);
      },
    });
  }

  updateAboutInformation() {
    this.companyService
      .updateAboutInformation(
        this.companyInfo.info_empresa_id,
        this.companyInfo
      )
      .subscribe({
        next: (e) => {
          this.messageService.successFullMessage(
            environment.mensaje_editado_ok
          );
          this.router.navigate(['/modulo-informacion-empresa']);
        },
        error: (e) => {
          this.errorBadRequest(e);
        },
      });
  }

  private errorBadRequest(e: any) {
    let cont = 0;
    if (e.status == 400) {
      cont = this.buildLstErrors(e.error.error.nombre_empresa as string, cont);
      cont = this.buildLstErrors(e.error.error.direccion as string, cont);
      cont = this.buildLstErrors(e.error.error.ciudad_pais as string, cont);
      cont = this.buildLstErrors(e.error.error.numero_fijo as string, cont);
      cont = this.buildLstErrors(e.error.error.numero_celular as string, cont);
      cont = this.buildLstErrors(e.error.error.correo as string, cont);
    }
  }

  private buildLstErrors(e: string, cont: number) {
    if (e !== undefined && e !== null) {
      this.errors[cont] = e;
      cont++;
    }
    return cont;
  }
}
