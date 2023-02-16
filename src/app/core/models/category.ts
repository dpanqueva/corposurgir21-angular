import { CategoryFeature } from "./category.feature";

export class Category {
  categoria_id: number;

  nombre: string;

  codigo: string;

  logo: string;

  descripcion:string;
  
  caracteristicas: Array<CategoryFeature> = [];
}
