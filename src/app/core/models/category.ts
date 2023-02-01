import { CategoryDetail } from "./category.detail";

export class Category {
  categoria_id: number;

  nombre: string;

  codigo: string;

  snactivo: string;

  logo: string;

  descripcion:string;
  
  caracteristicas: Array<CategoryDetail> = [];
}
