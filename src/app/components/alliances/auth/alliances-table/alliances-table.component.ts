import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Alliance } from 'src/app/core/models/alliance';
import { AllianceService } from 'src/app/core/services/alliances/principal/alliance.service';
import { MessageService } from 'src/app/core/services/message.service';
import { environment } from 'src/environments/environment.prod';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-alliances-table',
  templateUrl: './alliances-table.component.html',
  styleUrls: ['./alliances-table.component.css'],
})
export class AlliancesTableComponent implements OnInit {
  alliances: Alliance[] = [];
  p: number = 1;
  total: number = 0;
  errors: string[] = [];
  alliance: Alliance = new Alliance();

  fileChoose: any = null;

  constructor(
    private allianceService: AllianceService,
    private messageService: MessageService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadAlliances();
  }

  loadAlliances() {
    this.allianceService
      .getAllAlliances()
      .subscribe((alliance) => (this.alliances = alliance));
  }

  deleteAlliance(alliance: Alliance) {
    Swal.fire({
      title: 'Está seguro de querer eliminar esta información?',
      text: `¡No podrás revertir esto! Alianza a eliminar ${alliance.nombre}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Si, eliminar información!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.allianceService.deleteAlliance(alliance).subscribe({
          next: (e) => {
            this.loadAlliances();
            Swal.fire(
              'Eliminado!',
              `La información ${alliance.nombre} ha sido eliminada.`,
              'success'
            );
          },
          error: (e) => {
            this.messageService.errorMessage(
              environment.mensaje_eliminado_error
            );
          },
        });
      }
    });
  }

  image(allianceItem: Alliance) {
    this.alliance = allianceItem;
  }

  chooseFile(event) {
    var files = event.target.files;
    var file = files[0];
    this.fileChoose = file;
    if (files && file) {
      var reader = new FileReader();
      reader.onload = this._handleReaderLoaded.bind(this);
      reader.readAsBinaryString(file);
    }
  }

  _handleReaderLoaded(readerEvent) {
    var binaryStr = readerEvent.target.result;
  }

  updateImage(alliance: Alliance) {
    this.allianceService.updateImage(this.formData(alliance), alliance.alianza_id.toString()).subscribe({
      next: (e) => {
        this.messageService.successFullMessage(environment.mensaje_creado_ok);
        this.loadAlliances();
      },
      error: (e) => {
        this.errorBadRequest(e);
      },
    });
  }

  private formData(allianceForm: Alliance): FormData {
    const formData = new FormData();
    formData.append('alianza_id', allianceForm.alianza_id.toString());
    formData.append('img_file', this.fileChoose);
    return formData;
  }

  private errorBadRequest(e: any) {
    
    let cont = 0;
    if (e.status == 400) {
      cont = this.buildLstErrors(e.error.error.nombre as string, cont);
      cont= this.buildLstErrors(e.error.error.descripcion as string,cont);
      cont = this.buildLstErrors(e.error.error.ruta_imagen as string,cont);
    }
  }

  private buildLstErrors(e: string, cont:number){
    
    if(e !== undefined && e !== null){
      this.errors[cont] = e;
      cont++;
    }
    return cont;
  }

  initChooseFile(){
    if(this.fileChoose != null){
      this.fileChoose=null;
    }
  }
}
