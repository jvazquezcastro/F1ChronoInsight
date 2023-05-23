import { Component, OnInit } from '@angular/core';
import { CircuitoService } from 'src/app/services/circuito.service';
import { Circuito } from 'src/app/interfaces/circuito';
import { TranslateService } from '@ngx-translate/core';


@Component({
  selector: 'app-circuitos',
  templateUrl: './circuitos.component.html',
  styleUrls: ['./circuitos.component.scss']
})
export class CircuitosComponent {
  public circuitos: Circuito[] = [];
  selectedYear: string = '';
  years = [  "2023",  "2022",  "2021",  "2020",  "2019",  "2018",  "2017",  "2016",  "2015",  "2014",  "2013",  "2012",  "2011",  "2010",  "2009",  "2008",  "2007",  "2006",  "2005",  "2004",  "2003",  "2002",  "2001",  "2000"];

  constructor(private circuitoService: CircuitoService, private traductor: TranslateService) {
    //A la variable traductor se le asigna el diccionario esp
    this.traductor.use('esp');
  }

   /*
  Función que actualiza variables y llama a funciones al seleccionar un año
  */
  onYearSelected(year: string) {
    console.log('Year selected:', year);
    this.selectedYear = year;
    this.loadCircuits();
  }

   /*
  Función que recoge el año seleccionado y hace la petición REST
  */
  getCircuitsByYear(year: string) {
    this.circuitoService.getCircuitsByYear(year).subscribe(
      circuitos => this.circuitos = circuitos
    );
  }

  /*
  Función que carga los circuitos y los guarda en un array de Circuitos
  */
  loadCircuits() {
    this.circuitoService.getCircuitsByYear(this.selectedYear).subscribe((response: any) => {
      const data = response.MRData.CircuitTable.Circuits;
      console.log('Year selected:', this.selectedYear);
      this.circuitos = data.map((circuito: {
        url: string; circuitName: any; Location: { country: any; locality: any; };
}) => {
        return {
          nombre: circuito.circuitName,
          pais: circuito.Location.country,
          ciudad: circuito.Location.locality,
          url: circuito.url
        } as Circuito;
      });
    });
  }

  /*
  Funciones de traducción
  */
  traducirPais(pais: string): string {
    return this.traductor.instant('PAIS.' + pais);
  }

  traducirCiudad(ciudad: string): string{
    //Guarda en la variable la traduccion de la ciudad como CIUDAD.ciudad
    const traduccion = this.traductor.instant('CIUDAD.' + ciudad);
    //Si la traduccion es diferente a CIUDAD.ciudad devuelve la traducción. Si es igual, se deja el valor de ciudad
    return traduccion !== 'CIUDAD.' + ciudad ? traduccion : ciudad;
  }

  traducirCircuito(circuito: string): string{
    const traduccion = this.traductor.instant('CIRCUITO.' + circuito);
    return traduccion !== 'CIRCUITO.' + circuito ? traduccion : circuito;
  }
}
