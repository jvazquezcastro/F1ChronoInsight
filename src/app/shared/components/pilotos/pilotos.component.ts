import { Component } from '@angular/core';
import { Piloto } from 'src/app/interfaces/piloto';
import { PilotoService } from 'src/app/services/piloto.service';

@Component({
  selector: 'app-pilotos',
  templateUrl: './pilotos.component.html',
  styleUrls: ['./pilotos.component.scss']
})
export class PilotosComponent {
  pilotos: Piloto[] = [];

  constructor(private pilotoService: PilotoService) {}

  ngOnInit() {
    this.obtenerPilotosDesde2000Hasta2023();
  }

  obtenerPilotosDesde2000Hasta2023() {
    const years = [  "2023",  "2022",  "2021",  "2020",  "2019",  "2018",  "2017"];

    years.forEach(year => {
      this.pilotoService.getDriversByYear(year).subscribe(data => {
        const driversByYear = data.MRData.DriverTable.Drivers;

        driversByYear.forEach((piloto: {
          permanentNumber: string;
          url: string; driverId: any; code: any; givenName: any; familyName: any; dateOfBirth: any; nationality: any;
}) => {
          if (!this.pilotos.find(p => p.pilotoId === piloto.driverId)) {
            const nuevoPiloto: Piloto = {
              pilotoId: piloto.driverId,
              nombre: piloto.givenName,
              apellido: piloto.familyName,
              fecha: piloto.dateOfBirth,
              nacionalidad: piloto.nationality,
              url: piloto.url,
              escuderia: '',
              puntos: '',
              posicion: '',
              victorias: '',
              dorsal: piloto.permanentNumber
            };
            console.log(this.pilotos.length)
            this.pilotos.push(nuevoPiloto);
          }
        });
      });
    });

  }
}
