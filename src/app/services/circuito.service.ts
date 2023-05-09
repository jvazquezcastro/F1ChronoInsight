import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Circuito } from '../interfaces/circuito';

@Injectable({
  providedIn: 'root'
})
export class CircuitoService {
  private url = 'http://ergast.com/api/f1/';

  constructor(private http: HttpClient) {}

  getCircuitsByYear(year: string): Observable<any> {
    const fullUrl = `${this.url}${year}/circuits.json`;
    return this.http.get<Circuito[]>(fullUrl);
  }
}
