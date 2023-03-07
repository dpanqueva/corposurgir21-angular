import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { About } from 'src/app/core/models/about';
import { AboutService } from 'src/app/core/services/about.service';
import { MessageService } from 'src/app/core/services/message.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-about-form',
  templateUrl: './about-form.component.html',
  styleUrls: ['./about-form.component.css']
})
export class AboutFormComponent implements OnInit {

  about: About = new About();
  errors: string[] = [];
  constructor(private aboutService: AboutService, private router: Router
    , private messageService: MessageService, private activateRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.loadAboutInformationItem();
  }

  loadAboutInformationItem(){
    this.activateRoute.params.subscribe(params => {
      let aboutId = params['aboutId'];
      if (aboutId) {
        this.aboutService.getAboutInformationById(aboutId).subscribe((aboutItem) => this.about = aboutItem);
      }
    });
  }

  createAboutInformation() {
    this.aboutService.createAboutInformation(this.about)
      .subscribe(
        {
          next: (e) => {
            this.messageService.successFullMessage(environment.mensaje_creado_ok);
            this.router.navigate(['/modulo-quienes-somos']);
          },
          error: (e) => {
            if (e.status == 400) {
              this.errorBadRequest(e);
            }
          }
        });
  }

  updateAboutInformation(){
    this.aboutService.updateAboutInformation(this.about.quienes_somos_id,this.about )
    .subscribe(
      {
        next: (e) => {
          this.messageService.successFullMessage(environment.mensaje_editado_ok);
          this.router.navigate(['/modulo-quienes-somos']);
        },
        error: (e) => {
          if (e.status == 400) {
            this.errorBadRequest(e);
          }
        }
      });
  }

  private errorBadRequest(e: any) {
    let cont = 0;
    if (e.status == 400) {
      cont = this.buildLstErrors(
        e.error.error.titulo as string,
        cont
      );
      cont = this.buildLstErrors(e.error.error.logo as string, cont);
      cont = this.buildLstErrors(e.error.error.descripcion as string, cont);
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
