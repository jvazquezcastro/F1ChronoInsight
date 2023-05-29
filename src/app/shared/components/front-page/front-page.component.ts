import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LenguajeService } from 'src/app/services/lenguaje.service';

@Component({
  selector: 'app-front-page',
  templateUrl: './front-page.component.html',
  styleUrls: ['./front-page.component.scss']
})
export class FrontPageComponent {
  constructor(private traductor: TranslateService, private lenguajeService: LenguajeService) {
    const lenguajeActual = this.lenguajeService.getSelectedLanguage();
    this.traductor.setDefaultLang(lenguajeActual);
    this.traductor.use(lenguajeActual);
  }

  traducirMiscelanea(string: string): string {
    return this.traductor.instant('MISC.' + string);
  }
}
