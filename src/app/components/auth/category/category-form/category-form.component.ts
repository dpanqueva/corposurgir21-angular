import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from 'src/app/core/models/category';
import { CategoryService } from 'src/app/core/services/category/principal/category.service'; 
import { MessageService } from 'src/app/core/services/message.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.css']
})
export class CategoryFormComponent implements OnInit {

  category: Category = new Category();
  errors: string[] = [];

  constructor(private activateRoute: ActivatedRoute, private categoryService: CategoryService
    , private messageService: MessageService, private router: Router) { }

  ngOnInit(): void {
    this.loadCategory();
  }

  loadCategory(): void {
    this.activateRoute.params.subscribe(params => {
      let categoryName = params['categoryName'];
      if (categoryName) {
        this.categoryService.getCategoryById(categoryName).subscribe((category) => this.category = category);
      }
    });
  }

  createCategory(): void {
    this.categoryService.createCategory(this.category)
      .subscribe(
        {
          next: (e) => {
            this.router.navigate(['/modulo-categoria']);
            this.messageService.successFullMessage(environment.mensaje_creado_ok);
          },
          error: (e) => {
            if (e.status == 400) {
              this.errors[0] = e.error.error.nombre as string;
              this.errors[1] = e.error.error.codigo as string;
              this.errors[2] = e.error.error.descripcion as string;
              this.errors[3] = e.error.error.snactivo as string;
              this.errors[4] = e.error.error.logo as string;
            }
          }
        });
  }

  updateCategory(): void {
    this.categoryService.updateCategory(this.category, this.category.categoria_id)
      .subscribe(
        {
          next: (e) => {
            this.router.navigate(['/modulo-categoria']);
            this.messageService.successFullMessage(environment.mensaje_creado_ok);
          },
          error: (e) => {
            if (e.status == 400) {
              this.errors[0] = e.error.error.nombre as string;
              this.errors[1] = e.error.error.codigo as string;
              this.errors[2] = e.error.error.descripcion as string;
              this.errors[3] = e.error.error.snactivo as string;
              this.errors[4] = e.error.error.logo as string;
            }
          }
        });
  }
}
