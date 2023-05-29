import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LenguajeService } from 'src/app/services/lenguaje.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  constructor(private lenguajeService: LenguajeService, private translate: TranslateService) {}

  setLanguage(language: string): void {
    this.lenguajeService.setSelectedLanguage(language);
    this.translate.use(language);
  }
}
