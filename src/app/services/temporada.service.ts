import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Temporada } from '../interfaces/temporada';

@Injectable({
  providedIn: 'root'
})
export class TemporadaService {
  private url = 'http://ergast.com/api/f1/';

  constructor(private http: HttpClient) { }

  getSeasonByYear(year: string){
    const fullUrl = `${this.url}${year}/driverStandings.json`;
    return this.http.get<Temporada>(fullUrl);
  }

}
