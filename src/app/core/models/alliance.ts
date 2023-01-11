import { AllianceFeatures } from "./alliance.features";

export class Alliance {
    alianza_id: number;
    nombre: string;
    descripcion: string;
    ruta_imagen: string;
    snactivo: string;
    pagina_web: string;

    caracteristicas: Array<AllianceFeatures> = [];
}
