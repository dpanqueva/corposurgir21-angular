import { Component, OnInit } from '@angular/core';
import { CompanyInfo } from 'src/app/core/models/company-info';
import { CompanyInfoService } from 'src/app/core/services/company/principal/company-info.service';
import { MessageService } from 'src/app/core/services/message.service';
import { environment } from 'src/environments/environment.prod';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-company-info-table',
  templateUrl: './company-info-table.component.html',
  styleUrls: ['./company-info-table.component.css']
})
export class CompanyInfoTableComponent implements OnInit {

  infoCompany: CompanyInfo[] = [];
  p: number = 1;
  total: number = 0;

  constructor(private companyInfoService: CompanyInfoService,
    private messageService: MessageService) { }

  ngOnInit(): void {
    this.loadCompanyInfo();
  }

  loadCompanyInfo(){
    this.companyInfoService.getCompanyInfoAll().subscribe(
      info =>{
       this.infoCompany = info;
      }
    );
  }

  deleteCompanyInfo(infoItem: CompanyInfo){
    Swal.fire({
      title: 'Está seguro de querer eliminar esta información?',
      text: `¡No podrás revertir esto! Información a eliminar de la empresa ${infoItem.nombre_empresa}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Si, eliminar información!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.companyInfoService.deleteCompanyInfo(infoItem).subscribe(
          {
            next: (e) => {
              this.loadCompanyInfo();
              Swal.fire(
                'Eliminado!',
                `La información ${infoItem.nombre_empresa} ha sido eliminada.`,
                'success'
              )
            },
            error: (e) => {
              this.messageService.errorMessage(environment.mensaje_eliminado_error);
            }
          });
      }
    });
  }

}
