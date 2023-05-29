import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Piloto } from 'src/app/interfaces/piloto';
import { LenguajeService } from 'src/app/services/lenguaje.service';
import { PilotoService } from 'src/app/services/piloto.service';
import { TranslationService } from 'src/app/services/traduccion.service';

@Component({
  selector: 'app-pilotos',
  templateUrl: './pilotos.component.html',
  styleUrls: ['./pilotos.component.scss']
})
export class PilotosComponent {
  pilotos: Piloto[] = [];

  constructor(private pilotoService: PilotoService, private traductor: TranslateService,
    private lenguajeService: LenguajeService, private translationService: TranslationService) {
      const lenguajeActual = this.lenguajeService.getSelectedLanguage();
      this.traductor.setDefaultLang(lenguajeActual);
      this.traductor.use(lenguajeActual);
  }

  //Al inicializar el componente se la función que carga los pilotos
  ngOnInit() {
    this.obtenerPilotosDesde2000Hasta2023();
  }

  /*
  Función que carga los pilotos de todos los años que contenga el array years
   */
  obtenerPilotosDesde2000Hasta2023() {
    const years = [  "2023",  "2022",  "2021",  "2020",
    "2019",  "2018",  "2017", "2016", "2015", "2014", "2013",
    "2012", "2011", "2010", "2009", "2008", "2007", "2006",
    "2005", "2004", "2003", "2002", "2001", "2000"];

    years.forEach(year => {
      this.pilotoService.getDriversByYear(year).subscribe(data => {
        const driversByYear = data.MRData.DriverTable.Drivers;
        driversByYear.forEach((piloto: {
          permanentNumber: string;
          url: string; driverId: any; code: any; givenName: any; familyName: any; dateOfBirth: any; nationality: any;
}) => {
          //Este if soluciona la posible repetición de pilotos
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

  /*
  Funciones de traducción
  */
  traducirNacionalidad(nacionalidad: string): string {
    return this.traductor.instant('NACIONALIDAD.' + nacionalidad);
  }

  traducirMiscelanea(string: string): string {
    return this.traductor.instant('MISC.' + string);
  }

}
