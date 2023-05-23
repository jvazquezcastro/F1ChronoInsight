import { Piloto } from "./piloto";

export interface Escuderia {
  escuderiaId: string,
  nombre: string,
  nacionalidad: string,
  url: string,
  pilotosDeEscuderia: Piloto[]
}
