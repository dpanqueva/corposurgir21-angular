import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryFeature } from 'src/app/core/models/category.feature';
import { CategoryFeaturesService } from 'src/app/core/services/category/features/category-features.service';
import { MessageService } from 'src/app/core/services/message.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-category-features-form',
  templateUrl: './category-features-form.component.html',
  styleUrls: ['./category-features-form.component.css']
})
export class CategoryFeaturesFormComponent implements OnInit {

  featuresCategory: CategoryFeature = new CategoryFeature();
  errors: string[] = [];

  constructor(private activateRoute: ActivatedRoute
    , private featureService: CategoryFeaturesService
    ,private router: Router,private messageService: MessageService) { }

  ngOnInit(): void {
    this.loadFeature()
  }

  loadFeature(): void {
    
    this.activateRoute.params.subscribe(params => {
      let featureId = params['featureId'];
      let categoryId = params['categoryId'];
      let featureName = params['feature'];
      if (featureId) {
        this.featureService.getFeaturesById(featureId).subscribe((feature) => this.featuresCategory = feature
        );
      }
      if(categoryId && featureName){
        this.featuresCategory.categoria_id = categoryId;
        this.featuresCategory.codigo_nombre = featureName;
      }
    });
  }

  createFeatureCategory(): void {
    this.featureService.createFeatures(this.featuresCategory)
    .subscribe(
      {
        next: (e) => {
          this.router.navigate(['/modulo-caracteristicas', this.featuresCategory.codigo_nombre]).then(() => { window.location.reload() });
          this.messageService.successFullMessage(environment.mensaje_creado_ok);
        },
        error: (e) => {
          if (e.status == 400) {
            this.errors[0] = e.error.error.codigo_nombre as string;
            this.errors[1] = e.error.error.categoria_id as string;
            this.errors[2] = e.error.error.descripcion as string;
            this.errors[3] = e.error.error.nombre_caracteristica as string;
          }
        }
      });
  }

  updateFeatureCategory(): void {
    this.featureService.updateFeatures(this.featuresCategory,this.featuresCategory.detalle_id)
    .subscribe(
      {
        next: (e) => {
          this.router.navigate(['/modulo-caracteristicas',this.featuresCategory.codigo_nombre]).then(() => { window.location.reload() });
          this.messageService.successFullMessage(environment.mensaje_creado_ok);
        },
        error: (e) => {
          if (e.status == 400) {
            this.errors[0] = e.error.error.codigo_nombre as string;
            this.errors[1] = e.error.error.categoria_id as string;
            this.errors[2] = e.error.error.descripcion as string;
            this.errors[3] = e.error.error.nombre_caracteristica as string;
          }
        }
      });
  }

}
