import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/core/models/category';
import { CategoryService } from 'src/app/core/services/category/principal/category.service';


@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  categories: Category[];
  today: Date = new Date();

  constructor(private categoryClient: CategoryService) {
  }

  ngOnInit(): void {
    this.categoryClient.getCategories().subscribe(
      category =>{
        this.categories = category;
      }
    );
  }

}
