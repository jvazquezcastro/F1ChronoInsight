import { Component } from '@angular/core';
import { Piloto } from 'src/app/interfaces/piloto';
import { PilotoService } from 'src/app/services/piloto.service';

@Component({
  selector: 'app-temporadas',
  templateUrl: './temporadas.component.html',
  styleUrls: ['./temporadas.component.scss']
})
export class TemporadasComponent {
  public pilotos: Piloto[] = [];
  selectedYear: string = '';
  years = ["2023", "2022", "2021", "2020", "2019", "2018", "2017", "2016", "2015", "2014", "2013", "2012", "2011", "2010", "2009", "2008", "2007", "2006", "2005", "2004", "2003", "2002", "2001", "2000"];

  constructor(private pilotoService: PilotoService) {}

   /*
  Función que actualiza variables y llama a funciones al seleccionar un año
  */
  onYearSelected(year: string) {
      console.log('Year selected:', year);
      this.selectedYear = year;
      console.log(this.pilotos)
      this.loadDrivers();
  }

  /*
  Función que carga los pilotos mediante la peticion del service y los guarda en un array de Pilotos
  */
  loadDrivers() {
    this.pilotoService.getDriversFromSeason(this.selectedYear).subscribe((response: any) => {
      const data = response.MRData.StandingsTable.StandingsLists[0].DriverStandings;
      console.log('Year selected:', this.selectedYear);
      this.pilotos = data.map((piloto: any) => {
        return {
          pilotoId: piloto.Driver.driverId,
          nombre: piloto.Driver.givenName,
          apellido: piloto.Driver.familyName,
          fecha: piloto.Driver.dateOfBirth,
          nacionalidad: piloto.Driver.nationality,
          url: piloto.Driver.url,
          posicion: piloto.position,
          puntos: piloto.points,
          victorias: piloto.wins,
          escuderia: piloto.Constructors[0].name
        } as Piloto;
        //Ordena los pilotos por su posición en la clasificación
      }).sort((a: Piloto, b: Piloto) => {
        return parseInt(a.posicion) - parseInt(b.posicion);
      });
    });
  }
}
