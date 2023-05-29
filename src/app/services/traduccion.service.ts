import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class TranslationService {
  private defaultLanguage = 'en';
  private selectedLanguageKey = 'selectedLanguage';
  public currentLanguage = this.defaultLanguage;

  constructor(private translate: TranslateService) {
    this.translate.setDefaultLang(this.defaultLanguage);
    const selectedLanguage = localStorage.getItem(this.selectedLanguageKey);
    if (selectedLanguage) {
      this.currentLanguage = selectedLanguage;
      this.translate.use(selectedLanguage);
    }
  }

  public setLanguage(language: string): void {
    this.currentLanguage = language;
    this.translate.use(language);
    localStorage.setItem(this.selectedLanguageKey, language);
  }
}
