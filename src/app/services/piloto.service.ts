import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Piloto } from '../interfaces/piloto';

@Injectable({
  providedIn: 'root'
})
export class PilotoService {
  private url = 'http://ergast.com/api/f1/';

  constructor(private http: HttpClient) {}

  getDriversByYear(year: string): Observable<any> {
    const fullUrl = `${this.url}${year}/drivers.json`;
    return this.http.get<Piloto[]>(fullUrl);
  }

  getDriversByConstructor(year: string, escuderia: string): Observable<any>{
    const fullUrl = `${this.url}${year}/constructors/${escuderia}/drivers.json`;
    return this.http.get<Piloto[]>(fullUrl);
  }

  getDriversFromSeason(year: string): Observable<any>{
    const fullUrl = `${this.url}${year}/driverStandings.json`;
    return this.http.get<Piloto[]>(fullUrl);
  }
}
