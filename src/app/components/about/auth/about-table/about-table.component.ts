import { Component, OnInit } from '@angular/core';
import { About } from 'src/app/core/models/about';
import { AboutService } from 'src/app/core/services/about.service';
import { MessageService } from 'src/app/core/services/message.service';
import { environment } from 'src/environments/environment.prod';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-about-table',
  templateUrl: './about-table.component.html',
  styleUrls: ['./about-table.component.css']
})
export class AboutTableComponent implements OnInit {

  aboutList: About[] = [];
  
  p: number = 1;
  total: number = 0;

  constructor(private aboutService: AboutService, private messageService: MessageService) { }

  ngOnInit(): void {
    this.loadAboutInformation();
  }

  loadAboutInformation() {
    this.aboutService.getAboutInformation().subscribe(
      about => {
        this.aboutList = about;
      }
    );
  }

  deleteAboutInformation(aboutItem: About){
    Swal.fire({
      title: 'Está seguro de querer eliminar esta información?',
      text: `¡No podrás revertir esto! Información a eliminar ${aboutItem.titulo}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Si, eliminar información!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.aboutService.deleteAboutInformation(aboutItem).subscribe(
          {
            next: (e) => {
              this.loadAboutInformation();
              Swal.fire(
                'Eliminado!',
                `La información ${aboutItem.titulo} ha sido eliminada.`,
                'success'
              )
            },
            error: (e) => {
              this.messageService.errorMessage(environment.mensaje_eliminado_error);
            }
          });
      }
    })
  }

}
