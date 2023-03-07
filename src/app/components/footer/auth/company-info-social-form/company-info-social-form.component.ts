import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CompanyInfoFeatures } from 'src/app/core/models/company.info.features';
import { SocialMediaService } from 'src/app/core/services/company/features/social-media.service';
import { CompanyInfoService } from 'src/app/core/services/company/principal/company-info.service';
import { MessageService } from 'src/app/core/services/message.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-company-info-social-form',
  templateUrl: './company-info-social-form.component.html',
  styleUrls: ['./company-info-social-form.component.css']
})
export class CompanyInfoSocialFormComponent implements OnInit {

  errors: string[]=[];
  companyFeatures: CompanyInfoFeatures= new CompanyInfoFeatures();

  constructor(private socialMediaService: SocialMediaService, private router: Router
    , private messageService: MessageService, private activateRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activateRoute.params.subscribe(params => {
      let socialMediaId = params['socialMediaId'];
      if (socialMediaId) {
        this.socialMediaService.getSocialMediaById(socialMediaId).subscribe(
          socialMedia=> this.companyFeatures = socialMedia
        );
      }
    });
  }

  createSocialMedia(){
    this.socialMediaService.createSocialMedia(this.companyFeatures).subscribe(
      {
        next: (e) => {
          this.messageService.successFullMessage(environment.mensaje_creado_ok);
          this.router.navigate(['/modulo-informacion-empresa-redes']);
        },
        error: (e) => {
          this.errorBadRequest(e);
        },
      });
  }

  updateSocialMedia(){
    this.socialMediaService.updateSocialMedia(this.companyFeatures).subscribe(
      {
        next: (e) => {
          this.messageService.successFullMessage(environment.mensaje_creado_ok);
          this.router.navigate(['/modulo-informacion-empresa-redes']);
        },
        error: (e) => {
          this.errorBadRequest(e);
        },
      });
  }

  private errorBadRequest(e: any) {
    let cont = 0;
    if (e.status == 400) {
      cont = this.buildLstErrors(e.error.error.nombre as string, cont);
      cont = this.buildLstErrors(e.error.error.url_red_social as string, cont);
      cont = this.buildLstErrors(e.error.error.logo as string, cont);
      cont = this.buildLstErrors(e.error.error.info_empresa_id as string, cont);
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
