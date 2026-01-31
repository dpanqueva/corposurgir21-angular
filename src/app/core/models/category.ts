import { CategoryFeature } from "./category.feature";

export class Category {
  categoria_id: number;

  nombre: string;

  codigo: string;

  logo: string;

  descripcion:string;

  bln_cinta_noticia: boolean;

  fe_fin_cinta: Date
  
  caracteristicas: Array<CategoryFeature> = [];
}
