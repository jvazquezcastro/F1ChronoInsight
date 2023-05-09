import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Escuderia } from '../interfaces/escuderia';

@Injectable({
  providedIn: 'root'
})
export class EscuderiaService {
  private url = 'http://ergast.com/api/f1/';

  constructor(private http: HttpClient) {}

  getCircuitsByYear(year: string): Observable<any> {
    const fullUrl = `${this.url}${year}/constructors.json`;
    return this.http.get<Escuderia[]>(fullUrl);
  }
}
