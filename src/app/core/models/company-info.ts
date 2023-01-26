import { CompanyInfoFeatures } from "./company.info.features";

export class CompanyInfo {

    info_empresa_id: number;

    nombre_empresa: string;

    direccion: string;

    ciudad_pais: string;

    numero_fijo: string;

    numero_celular: string;

    correo: string;

    caracteristicas: Array<CompanyInfoFeatures> = [];
}
