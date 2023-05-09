import { Component } from '@angular/core';
import { Piloto } from 'src/app/interfaces/piloto';
import { PilotoService } from 'src/app/services/piloto.service';

@Component({
  selector: 'app-pilotos',
  templateUrl: './pilotos.component.html',
  styleUrls: ['./pilotos.component.scss']
})
export class PilotosComponent {
  public pilotos: Piloto[] = [];
  selectedYear: string = '';
  years = [  "2023",  "2022",  "2021",  "2020",  "2019",  "2018",  "2017",  "2016",  "2015",  "2014",  "2013",  "2012",  "2011",  "2010",  "2009",  "2008",  "2007",  "2006",  "2005",  "2004",  "2003",  "2002",  "2001",  "2000"];

  constructor(private pilotoService: PilotoService) {}


  loadCircuits() {
    this.pilotoService.getCircuitsByYear(this.selectedYear).subscribe((response: any) => {
      const data = response.MRData.DriverTable.Drivers;
      console.log('Year selected:', this.selectedYear);
      this.pilotos = data.map((piloto: {
        driverId: string;
        dateOfBirth: string;
        nacionality: string;
        url: string;
        familyName: string;
        givenName: any;
}) => {
        return {
          pilotoId: piloto.driverId,
          nombre: piloto.givenName,
          apellido: piloto.familyName,
          fecha: piloto.dateOfBirth,
          nacionalidad: piloto.nacionality,
          url: piloto.url
        } as Piloto;
      });
    });
  }

  getCircuitsByYear(year: string) {
    this.pilotoService.getCircuitsByYear(year).subscribe(
      pilotos => this.pilotos = pilotos
    );
  }

  onYearSelected(year: string) {
    console.log('Year selected:', year);
    this.selectedYear = year;
    this.loadCircuits();
  }
}
