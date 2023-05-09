import { Piloto } from "./piloto";

export interface Escuderia {
  pilotos: any;
  escuderiaId: string,
  nombre: string,
  nacionalidad: string,
  url: string,
  pilotosDeEscuderia: Piloto[]
}
