import { Component } from '@angular/core';
import { Escuderia } from 'src/app/interfaces/escuderia';
import { Piloto } from 'src/app/interfaces/piloto';
import { EscuderiaService } from 'src/app/services/escuderia.service';
import { PilotoService } from 'src/app/services/piloto.service';
import { CommonModule } from '@angular/common';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-escuderias',
  templateUrl: './escuderias.component.html',
  styleUrls: ['./escuderias.component.scss']
})

export class EscuderiasComponent {
  public escuderias: Escuderia[] = [];
  public pilotos: Piloto[] = [];
  public pilotosPorEscuderia = null;
  selectedYear: string = '';
  selectedConstructor: string = '';
  years = [  "2023",  "2022",  "2021",  "2020",  "2019",  "2018",  "2017",  "2016",  "2015",  "2014",  "2013",  "2012",  "2011",  "2010",  "2009",  "2008",  "2007",  "2006",  "2005",  "2004",  "2003",  "2002",  "2001",  "2000"];
  escuderia: any;

  constructor(private escuderiaService: EscuderiaService, private pilotoService: PilotoService) {}



  loadConstructors() {
    this.escuderiaService.getCircuitsByYear(this.selectedYear).subscribe((response: any) => {
      const data = response.MRData.ConstructorTable.Constructors;
      console.log('Year selected:', this.selectedYear);
      this.escuderias = data.map((escuderia: {
        nationality: string;
        constructorId: string;
        url: string;
        name: any;
}) => {
        return {
          nombre: escuderia.name,
          nacionalidad: escuderia.nationality,
          escuderiaId: escuderia.constructorId,
          url: escuderia.url
        } as Escuderia;
      });
    });
  }

  loadDriversByConstructors() {
    const requests = this.escuderias.map(escuderia =>
      this.pilotoService.getDriversByConstructor(this.selectedYear, escuderia.escuderiaId)
    );
    forkJoin(requests).subscribe(responses => {
      responses.forEach((response, index) => {
        const data = response.MRData.DriverTable.Drivers;
        this.pilotos.push(...data.map((piloto: { driverId: any; givenName: any; familyName: any; nationality: any; }) => ({
          pilotoId: piloto.driverId,
          nombre: piloto.givenName,
          apellido: piloto.familyName,
          nacionalidad: piloto.nationality,
          escuderia: this.escuderias[index].escuderiaId
        } as Piloto)));
      });
    });
  }

  getCircuitsByYear(year: string) {
    this.escuderiaService.getCircuitsByYear(year).subscribe(
      escuderias => this.escuderias = escuderias
    );
  }

  getPilotosByEscuderiaId(escuderiaId: string): Piloto[] {
    return this.pilotos.filter(p => p.escuderia == escuderiaId);
  }


  onYearSelected(year: string) {
    console.log('Year selected:', year);
    this.selectedYear = year;
    this.pilotos.splice(0);
    this.loadConstructors();
    this.loadDriversByConstructors();

  }

}
