import { Component, OnInit } from '@angular/core';

import {Category} from '../../core/models/category'
import {CategoryService} from '../../core/services/category.service';


@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  categories: Category[];

  constructor(private categoryClient: CategoryService) {
  }

  ngOnInit(): void {
    debugger
    this.categoryClient.getCategories().subscribe(
      category =>{
        this.categories = category;
      }
    );
  }

}
