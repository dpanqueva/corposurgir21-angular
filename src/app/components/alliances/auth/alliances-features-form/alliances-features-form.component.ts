import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AllianceFeatures } from 'src/app/core/models/alliance.features';
import { AllianceFeaturesService } from 'src/app/core/services/alliances/features/alliance-features.service';
import { MessageService } from 'src/app/core/services/message.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-alliances-features-form',
  templateUrl: './alliances-features-form.component.html',
  styleUrls: ['./alliances-features-form.component.css'],
})
export class AlliancesFeaturesFormComponent implements OnInit {
  feature: AllianceFeatures = new AllianceFeatures();
  errors: string[] = [];

  constructor(
    private activateRoute: ActivatedRoute,
    private allianceFeatureService: AllianceFeaturesService,
    private router: Router,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.activateRoute.params.subscribe((params) => {
      let allianceId = params['allianceId'];
      let allianceName = params['allianceName'];
      let featureId = params['featureId'];
      if (allianceId && allianceName) {
        this.feature.codigo_nombre = allianceName;
        this.feature.alianza_id = allianceId;
        if (featureId) {
          this.feature.alianza_caracteristica_id = featureId;
          this.allianceFeatureService
            .getAllianceFeatureById(featureId)
            .subscribe((rs) => (this.feature = rs));
        }
      }
    });
  }

  createfeature() {
    this.allianceFeatureService.createAllianceFeature(this.feature).subscribe({
      next: (e) => {
        this.messageService.successFullMessage(environment.mensaje_creado_ok);
        this.router.navigate(['/modulo-alianzas-caracteristicas',e.alianza_id, e.codigo_nombre]);
      },
      error: (e) => {
        this.errorBadRequest(e);
      },
    });
  }

  updatefeature() {
    this.allianceFeatureService
      .updateAllianceFeature(
        this.feature,
        this.feature.alianza_caracteristica_id.toString()
      )
      .subscribe({
        next: (e) => {
          this.messageService.successFullMessage(environment.mensaje_creado_ok);
          this.router.navigate(['/modulo-alianzas-caracteristicas',e.alianza_id, e.codigo_nombre]);
        },
        error: (e) => {
          this.errorBadRequest(e);
        },
      });
  }

  private errorBadRequest(e: any) {
    let cont = 0;
    if (e.status == 400) {
      cont = this.buildLstErrors(
        e.error.error.nombre_caracteristica as string,
        cont
      );
      cont = this.buildLstErrors(e.error.error.descripcion as string, cont);
      cont = this.buildLstErrors(e.error.error.codigo_nombre as string, cont);
      cont = this.buildLstErrors(e.error.error.alianza_id as string, cont);
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
