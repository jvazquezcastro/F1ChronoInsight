import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LenguajeService } from 'src/app/services/lenguaje.service';

@Component({
  selector: 'app-error-page',
  templateUrl: './error-page.component.html',
  styleUrls: ['./error-page.component.scss']
})
export class ErrorPageComponent {

  constructor(private traductor: TranslateService, private lenguajeService: LenguajeService) {
    const lenguajeActual = this.lenguajeService.getSelectedLanguage();
      this.traductor.setDefaultLang(lenguajeActual);
      this.traductor.use(lenguajeActual);
  }

  traducirMiscelanea(string: string): string {
    return this.traductor.instant('MISC.' + string);
  }

  //Función para cambiar el idioma al hacer clic en la bandera
  setLanguage(language: string): void {
    this.traductor.use(language);
  }
}
