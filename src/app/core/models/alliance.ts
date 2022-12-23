import { AllianceFeatures } from "./alliance.features";

export class Alliance {
    alianza_id: number;
    nombre: string;
    descripcion: string;
    ruta_imagen: string;
    snactivo: string;

    caracteristicas: Array<AllianceFeatures> = [];
}
