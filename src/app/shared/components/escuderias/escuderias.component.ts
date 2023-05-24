import { Component } from '@angular/core';
import { Escuderia } from 'src/app/interfaces/escuderia';
import { Piloto } from 'src/app/interfaces/piloto';
import { EscuderiaService } from 'src/app/services/escuderia.service';
import { PilotoService } from 'src/app/services/piloto.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-escuderias',
  templateUrl: './escuderias.component.html',
  styleUrls: ['./escuderias.component.scss']
})
export class EscuderiasComponent {
  public escuderias: Escuderia[] = [];
  public pilotos: Piloto[] = [];
  selectedYear: string = '';
  years = [ "2023", "2022", "2021", "2020", "2019", "2018", "2017", "2016", "2015", "2014", "2013", "2012", "2011", "2010", "2009", "2008", "2007", "2006", "2005", "2004", "2003", "2002", "2001", "2000"];

  constructor(private escuderiaService: EscuderiaService, private pilotoService: PilotoService) {}

   /*
  Función que actualiza variables y llama a funciones al seleccionar un año
  */
  onYearSelected(year: string) {
    console.log('Year selected:', year);
    this.selectedYear = year;
    //Vaciar el array de pilotos para que se refresquen al cambiar de año
    this.pilotos.splice(0);
    this.loadDriversByConstructors();
    this.loadConstructors();
  }

  /*
  Función que carga las escuderías mediante la peticion del service y los guarda en un array de Escuderías
  */
  loadConstructors() {
    this.escuderiaService.getDriversByYear(this.selectedYear).subscribe((response: any) => {
      const data = response.MRData.ConstructorTable.Constructors;
      console.log('Year selected:', this.selectedYear);
      this.escuderias = data.map((escuderia: any) => {
        return {
          nombre: escuderia.name,
          nacionalidad: escuderia.nationality,
          escuderiaId: escuderia.constructorId,
          url: escuderia.url
        } as Escuderia;
      });
    });
  }

  /*
  Función que carga los pilotos mediante la peticion del service y los guarda en un array de Pilotos
  */
  loadDriversByConstructors() {
  /*
  Por cada escuderia se hace una petición de recoger sus pilotos pasándole por parámetro el año seleccionado
  y el id de la escuderia y lo guarda en el array requests
  */
    const requests = this.escuderias.map(escuderia =>
      this.pilotoService.getDriversByConstructor(this.selectedYear, escuderia.escuderiaId)
    );
    /*
    La función forkJoin se utiliza para solucionar los problemas de asincronía combinando todas las requests en una.
    Se crea el piloto y se añade con push() al array de Pilotos
    */
    forkJoin(requests).subscribe(responses => {
      responses.forEach((response, index) => {
        const data = response.MRData.DriverTable.Drivers;
        this.pilotos.push(...data.map((piloto: any) => ({
          pilotoId: piloto.driverId,
          nombre: piloto.givenName,
          apellido: piloto.familyName,
          nacionalidad: piloto.nationality,
          escuderia: this.escuderias[index].escuderiaId,
          dorsal: piloto.permanentNumber
        } as Piloto)));
      });
    });
  }

    /*
  Función que se encarga de asignar a cada escuderia sus piotos
  */
  getPilotosByEscuderiaId(escuderiaId: string): Piloto[] {
    /*
    Usa la función filter para recorrer el array de pilotos y retornar un piloto si su escuderia
    es igual a la que le llega por parámetro
    */
    return this.pilotos.filter(p => p.escuderia == escuderiaId);
  }

}
