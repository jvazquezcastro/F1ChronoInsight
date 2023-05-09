import { Escuderia } from "./escuderia";
import { Piloto } from "./piloto"

export interface Temporada {
  posiciones: string[],
  pilotos: Piloto[],
  escuderias: Escuderia[],
  puntos: string,
  victorias: string
}
