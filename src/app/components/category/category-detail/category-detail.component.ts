import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from 'src/app/core/models/category';
import { CategoryService } from 'src/app/core/services/category.service';

@Component({
  selector: 'app-category-detail',
  templateUrl: './category-detail.component.html',
  styleUrls: ['./category-detail.component.css']
})
export class CategoryDetailComponent implements OnInit {

  categories: Category;

  constructor(private router: Router, private activateRoute: ActivatedRoute
    ,private categoryClient: CategoryService) { }

  ngOnInit(): void {
    this.activateRoute.params.subscribe(params =>{
      let nombre = params['nombre']
      if(nombre){
        this.categoryClient.getDetail(nombre)
        .subscribe(
          (category) =>{
            this.categories = category
          }
        );
        
      }
    });
  }

}
