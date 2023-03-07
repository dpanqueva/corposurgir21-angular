import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Category } from 'src/app/core/models/category';
import { CategoryService } from 'src/app/core/services/category/principal/category.service';
import { MessageService } from 'src/app/core/services/message.service';
import { environment } from 'src/environments/environment.prod';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-category-table',
  templateUrl: './category-table.component.html',
  styleUrls: ['./category-table.component.css']
})
export class CategoryTableComponent implements OnInit {

  categories: Category[];

  p: number = 1;
  total: number = 0;

  constructor(private categoryClient: CategoryService, private router: Router
    ,private messageService: MessageService) {
  }

  ngOnInit(): void {
    this.loadCategory();
  }

  loadCategory():void{
    this.categoryClient.getCategories().subscribe(
      category =>{
        this.categories = category;
        this.total = this.categories.length;
      }
    );
  }

  deleteCategory(category: Category){
    Swal.fire({
      title: 'Está seguro de querer eliminar esta categoría?',
      text: `¡No podrás revertir esto! categoría a eliminar ${category.nombre}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Si, eliminar categoría!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.categoryClient.deleteCategory(category).subscribe(
          {
            next: (e) => {
              this.loadCategory();
              Swal.fire(
                'Eliminado!',
                `La categoría ${category.nombre} ha sido eliminada.`,
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
