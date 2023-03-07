import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from 'src/app/core/models/category';
import { CategoryService } from 'src/app/core/services/category/principal/category.service';
import { MessageService } from 'src/app/core/services/message.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.css'],
})
export class CategoryFormComponent implements OnInit {
  category: Category = new Category();
  errors: string[] = [];

  constructor(
    private activateRoute: ActivatedRoute,
    private categoryService: CategoryService,
    private messageService: MessageService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadCategory();
  }

  loadCategory(): void {
    this.activateRoute.params.subscribe((params) => {
      let categoryName = params['categoryName'];
      if (categoryName) {
        this.categoryService
          .getCategoryById(categoryName)
          .subscribe((category) => (this.category = category));
      }
    });
  }

  createCategory(): void {
    this.categoryService.createCategory(this.category).subscribe({
      next: (e) => {
        this.router.navigate(['/modulo-categoria']);
        this.messageService.successFullMessage(environment.mensaje_creado_ok);
      },
      error: (e) => {
        this.errorBadRequest(e);
      },
    });
  }

  updateCategory(): void {
    this.categoryService
      .updateCategory(this.category, this.category.categoria_id)
      .subscribe({
        next: (e) => {
          this.router.navigate(['/modulo-categoria']);
          this.messageService.successFullMessage(environment.mensaje_creado_ok);
        },
        error: (e) => {
          this.errorBadRequest(e);
        },
      });
  }

  private errorBadRequest(e: any) {
    let cont = 0;
    if (e.status == 400) {
      cont = this.buildLstErrors(e.error.error.nombre as string, cont);
      cont = this.buildLstErrors(e.error.error.codigo as string, cont);
      cont = this.buildLstErrors(e.error.error.descripcion as string, cont);
      cont = this.buildLstErrors(e.error.error.snactivo as string, cont);
      cont = this.buildLstErrors(e.error.error.logo as string, cont);
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
