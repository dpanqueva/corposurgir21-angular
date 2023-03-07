import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AllianceFeatures } from 'src/app/core/models/alliance.features';
import { AllianceFeaturesService } from 'src/app/core/services/alliances/features/alliance-features.service';
import { MessageService } from 'src/app/core/services/message.service';
import { environment } from 'src/environments/environment.prod';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-alliances-features-table',
  templateUrl: './alliances-features-table.component.html',
  styleUrls: ['./alliances-features-table.component.css'],
})
export class AlliancesFeaturesTableComponent implements OnInit {
  allianceFeatures: AllianceFeatures[] = [];
  allianceNameSection: string = 'Sin identificación';
  allianceIdSection: string = '0';
  p: number = 1;
  total: number = 0;
  errors: string[] = [];

  constructor(
    private activateRoute: ActivatedRoute,
    private allianceFeatureService: AllianceFeaturesService,
    private router: Router,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
   this.loadFeatures();
  }


  loadFeatures(){
    this.activateRoute.params.subscribe((params) => {
      let allianceId = params['allianceId'];
      let allianceName = params['allianceName'];
      if (allianceId && allianceName) {
        this.allianceNameSection = allianceName;
        this.allianceIdSection = allianceId;
        this.allianceFeatureService
          .getAllianceFeaturesByNameAndId(allianceName, allianceId)
          .subscribe((rs) => (this.allianceFeatures = rs));
      }
    });
  }

  onCreateFactory(event: any) {
    this.router.navigate(['/modulo-alianzas-caracteristicas/form', this.allianceIdSection, this.allianceNameSection])
  }

  onUpdateFactory(featureItem: AllianceFeatures){
    this.router.navigate(['/modulo-alianzas-caracteristicas/form', featureItem.alianza_id, featureItem.codigo_nombre, featureItem.alianza_caracteristica_id])

  }

  deleteFeature(featureItem: AllianceFeatures){
    Swal.fire({
      title: 'Está seguro de querer eliminar esta información?',
      text: `¡No podrás revertir esto! característica a eliminar ${featureItem.nombre_caracteristica}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Si, eliminar característica!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.allianceFeatureService.deleteAllianceFeature(featureItem).subscribe({
          next: (e) => {
            this.loadFeatures();
            Swal.fire(
              'Eliminado!',
              `La característica ${featureItem.nombre_caracteristica} ha sido eliminada.`,
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
}
