import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from 'src/app/core/models/category';
import { CategoryFeature } from 'src/app/core/models/category.feature';
import { CategoryService } from 'src/app/core/services/category/principal/category.service'; 
import { CategoryFeaturesService } from 'src/app/core/services/category/features/category-features.service';
import { MessageService } from 'src/app/core/services/message.service';
import { environment } from 'src/environments/environment.prod';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-category-features',
  templateUrl: './category-features.component.html',
  styleUrls: ['./category-features.component.css']
})
export class CategoryFeaturesComponent implements OnInit {

  categoryFeatures: Category = new Category();
  actualCategory: string;
  actualCategoryId: number;
  p: number = 1;
  total: number = 0;

  constructor(private categoryService: CategoryService, private activateRoute: ActivatedRoute
    , private router: Router, private featureService: CategoryFeaturesService
    , private messageService: MessageService) { }

  ngOnInit(): void {
    this.loadFeaturesCategory();
  }

  loadFeaturesCategory() {
    this.activateRoute.params.subscribe(params => {
      let categoryName = params['categoryName'];
      this.actualCategory = categoryName;
      if (categoryName) {
        this.categoryService.getDetail(categoryName).subscribe(
          (category) => {
            this.categoryFeatures = category;
            this.actualCategoryId = category.categoria_id;
          });
      }
    });
  }

  onCreateFactory(event: any) {
    this.router.navigate(['/modulo-caracteristicas/form', this.actualCategory, this.actualCategoryId])
  }

  deleteCategoryFeature(feature: CategoryFeature) {
    Swal.fire({
      title: 'Está seguro de querer eliminar este detalle de categoría?',
      text: `¡No podrás revertir esto! Detalle a eliminar ${feature.nombre_caracteristica}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Si, eliminar categoría!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.featureService.deleteCategory(feature).subscribe(
          {
            next: (e) => {
              this.loadFeaturesCategory();
              Swal.fire(
                'Eliminado!',
                `El detalle de la categoría ${feature.nombre_caracteristica} ha sido eliminada.`,
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
