import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment.secret';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  private apiKey = environment.apiKey;
  private geoCode = 'https://api.openweathermap.org/geo/1.0/direct';
  private apiUrl = 'https://api.openweathermap.org/data/2.5/onecall';

  constructor(private http: HttpClient) { }

  getCoordinates(city: string): Observable<any> {
    const params = new HttpParams()
      .set('q', city)
      .set('appid', this.apiKey);

    return this.http.get(this.geoCode, { params });
  }

  getWeatherByCity(lat: number, lon: number, units: string): Observable<any> {
    const params = new HttpParams()
      .set('lat', lat)
      .set('lon', lon)
      .set('exclude', 'minutely,hourly,alerts')
      .set('appid', this.apiKey)
      .set('units', units);

    return this.http.get(this.apiUrl, { params });
  }
}
