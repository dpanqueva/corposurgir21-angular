import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CompanyInfoFeatures } from 'src/app/core/models/company.info.features';
import { SocialMediaService } from 'src/app/core/services/company/features/social-media.service';
import { CompanyInfoService } from 'src/app/core/services/company/principal/company-info.service';
import { MessageService } from 'src/app/core/services/message.service';
import { environment } from 'src/environments/environment.prod';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-company-info-social-table',
  templateUrl: './company-info-social-table.component.html',
  styleUrls: ['./company-info-social-table.component.css'],
})
export class CompanyInfoSocialTableComponent implements OnInit {
  socialMedia: CompanyInfoFeatures[] = [];
  p: number = 1;
  total: number = 0;

  constructor(
    private socialMediaService: SocialMediaService,
    private router: Router,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.loadCompanyInfoSocialMedia();
  }

  loadCompanyInfoSocialMedia() {
    this.socialMediaService
      .getSocialMediaAll()
      .subscribe((c) => (this.socialMedia = c));
  }

  deleteCompanyInfoSocial(socialMedia: CompanyInfoFeatures) {
    Swal.fire({
      title: 'Está seguro de querer eliminar esta información?',
      text: `¡No podrás revertir esto! Información a eliminar de red social ${socialMedia.nombre}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Si, eliminar información de red social!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.socialMediaService.deleteSocialMedia(socialMedia).subscribe(
          {
            next: (e) => {
              this.loadCompanyInfoSocialMedia();
              Swal.fire(
                'Eliminado!',
                `La información de red social ${socialMedia.nombre} ha sido eliminada.`,
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
