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
              this.errors[0] = e.error.error.titulo as string;
              this.errors[1] = e.error.error.logo as string;
              this.errors[2] = e.error.error.descripcion as string;
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
            this.errors[0] = e.error.error.titulo as string;
            this.errors[1] = e.error.error.logo as string;
            this.errors[2] = e.error.error.descripcion as string;
          }
        }
      });
  }

}
