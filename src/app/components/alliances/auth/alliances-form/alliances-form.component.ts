import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Alliance } from 'src/app/core/models/alliance';
import { AllianceService } from 'src/app/core/services/alliances/principal/alliance.service';
import { MessageService } from 'src/app/core/services/message.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-alliances-form',
  templateUrl: './alliances-form.component.html',
  styleUrls: ['./alliances-form.component.css'],
})
export class AlliancesFormComponent implements OnInit {
  alliance: Alliance = new Alliance();
  errors: string[] = [];
  fileChoose: any = null;

  constructor(
    private allianceService: AllianceService,
    private messageService: MessageService,
    private router: Router,
    private activateRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.activateRoute.params.subscribe((params) => {
      let allianceId = params['allianceId'];
      if (allianceId) {
        this.allianceService
          .getAllianceById(allianceId)
          .subscribe((rs) => (this.alliance = rs));
      }
    });
  }

  createAlliance() {

    this.allianceService.createAlliance(this.formData('create')).subscribe({
      next: (e) => {
        this.messageService.successFullMessage(environment.mensaje_creado_ok);
        this.router.navigate(['/modulo-alianzas']);
      },
      error: (e) => {
        this.errorBadRequest(e);
      },
    });
  }

  updateAlliance() {
    this.alliance.nombre = this.replaceBlancFieldNameAllaince(this.alliance.nombre);
    this.allianceService.updateAlliance(this.alliance).subscribe({
      next: (e) => {
        this.messageService.successFullMessage(environment.mensaje_creado_ok);
        this.router.navigate(['/modulo-alianzas']);
      },
      error: (e) => {
        this.errorBadRequest(e);
      },
    });
  }

  chooseFile(event: any): void {
    const files = event.target.files;
    const file = files[0];

    this.fileChoose = file;

    if (files && file) {
      this.alliance.ruta_imagen = file.name;
      const reader = new FileReader();
      reader.readAsDataURL(file);
    }
  }

  private formData(operation: string): FormData {
    
    const formData = new FormData();
    if (operation == 'update') {
      formData.append(
        'alianza_id',
        this.validateDataFormData(this.alliance.alianza_id.toString())
      );
    }
    if (this.validateDataForm(this.alliance.nombre)) {
      this.alliance.nombre = this.replaceBlancFieldNameAllaince(this.alliance.nombre);
      formData.append('nombre', this.validateDataFormData(this.alliance.nombre));
    }
    if (this.validateDataForm(this.alliance.descripcion)) {
      formData.append(
        'descripcion',
        this.validateDataFormData(this.alliance.descripcion)
      );
    }
    if (this.validateDataForm(this.alliance.ruta_imagen)) {
      formData.append(
        'ruta_imagen',
        this.validateDataFormData(this.alliance.ruta_imagen)
      );
    }
    if (this.validateDataForm(this.fileChoose)) {
      formData.append('img_file', this.validateDataFormData(this.fileChoose));
    }

    formData.append('snactivo', 'S');
    if (this.validateDataForm(this.alliance.pagina_web)) {
      formData.append(
        'pagina_web',
        this.validateDataFormData(this.alliance.pagina_web)
      );
    }

    if (this.alliance.direccion) {
      formData.append(
        'direccion',
        this.validateDataFormData(this.alliance.direccion)
      );
    }

    if (this.validateDataForm(this.alliance.barrio)) {
      formData.append('barrio', this.validateDataFormData(this.alliance.barrio));
    }

    return formData;
  }

  private errorBadRequest(e: any) {
    let cont = 0;
    if (e.status == 400) {
      cont = this.buildLstErrors(e.error.error.nombre as string, cont);
      cont = this.buildLstErrors(e.error.error.descripcion as string, cont);
      cont = this.buildLstErrors(e.error.error.ruta_imagen as string, cont);
      cont = this.buildLstErrors(e.error.error.pagina_web as string, cont);
      cont = this.buildLstErrors(e.error.error.direccion as string, cont);
      cont = this.buildLstErrors(e.error.error.barrio as string, cont);
    }
  }

  private buildLstErrors(e: string, cont: number) {
    if (e !== undefined && e !== null) {
      this.errors[cont] = e;
      cont++;
    }
    return cont;
  }

  private validateDataFormData(e: string) {
    
    if (e === undefined || e === null) {
      return null;
    }
    return e;
  }

  private validateDataForm(e: string): boolean {
    
    if (e === undefined || e === null) {
      return false;
    }
    return true;
  }

  private replaceBlancFieldNameAllaince(e: string): string {
    return e.replace(/ /g, '-');
  }
}
