import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LenguajeService {
  private lenguajeKey = 'selectedLanguage';
  private defaultLanguage = 'es';

  constructor() {}

  getSelectedLanguage(): string {
    return localStorage.getItem(this.lenguajeKey) || this.defaultLanguage;
  }

  setSelectedLanguage(lenguaje: string): void {
    localStorage.setItem(this.lenguajeKey, lenguaje);
  }
}
