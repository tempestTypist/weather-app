import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable, switchMap } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from '../environments/environment.secret';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  private apiKey = environment.apiKey;
  private geoCode = 'https://api.openweathermap.org/geo/1.0/direct';
  private apiUrl = 'https://api.openweathermap.org/data/2.5/onecall';

  private weatherData = new BehaviorSubject<any>(null);
  weatherData$ = this.weatherData.asObservable(); 

  private currentWeatherData = new BehaviorSubject<any>(null);
  currentWeatherData$ = this.currentWeatherData.asObservable(); 

  private forecastData = new BehaviorSubject<any>(null);
  forecastData$ = this.forecastData.asObservable(); 

  private unit = new BehaviorSubject<string>('metric'); 
  units$ = this.unit.asObservable();

  private latitude: number = 0;
  private longitude: number = 0;
  private timeZone: string = 'America/New_York';

  constructor(private http: HttpClient) { }

  //accepts city parameter and returns observable emitting api response
  fetchCoordinates(city: string): Observable<any> {
    const params = new HttpParams()
      .set('q', city)
      .set('appid', this.apiKey)

    return this.http.get(this.geoCode, { params })
  }

  setCoordinates(lat: number, lon: number) {
    this.latitude = lat;
    this.longitude = lon;
  }

  toggleUnits(): void {
    const newUnit = this.unit.value === 'metric' ? 'imperial' : 'metric';
    this.unit.next(newUnit); 
  }

  convertUnixToTimeZone(unixTimestamp: number, timeZone: string): string {
    const date = new Date(unixTimestamp * 1000);
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: '2-digit',
      weekday: 'short',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    };

    return new Intl.DateTimeFormat('en-US', {
      ...options,
      timeZone,
    }).format(date);
  }

  processData(data: any): any {
    const unixTimestamp = data.current.dt;
    this.currentWeatherData = { 
      ...data.current, 
      currentDate: this.convertUnixToTimeZone(unixTimestamp, this.timeZone)
    };
    console.log('Converted Current Weather Data:', this.currentWeatherData);

    this.forecastData = data.daily.map((item: any) => {
      const { dt } = item;
      const forecastDate = this.convertUnixToTimeZone(dt, this.timeZone);
      return { forecastDate, ...item };
    });
    console.log('Converted Forecast Data:', this.forecastData);

    return {
      current: this.currentWeatherData,
      forecast: this.forecastData,
    };
  }

  updateWeatherData(data: any): void {
    this.weatherData.next(data);
    console.log("weather data updated: ", data)
  }

  fetchWeatherData(): void {
    if (this.latitude !== undefined && this.longitude !== undefined) {
      const params = new HttpParams()
      .set('lat', this.latitude)
      .set('lon', this.longitude)
      .set('exclude', 'minutely,hourly,alerts')
      .set('appid', this.apiKey)
      .set('units', this.unit.value);

      this.http
        .get(this.apiUrl, { params })
        .pipe(tap((data) => this.updateWeatherData(data)))
        .subscribe();
    }
  }

  getWeather(): Observable<any> {
      const params = new HttpParams()
      .set('lat', this.latitude)
      .set('lon', this.longitude)
      .set('exclude', 'minutely,hourly,alerts')
      .set('appid', this.apiKey)
      .set('units', this.unit.value);

      return this.http
        .get(this.apiUrl, { params })
        .pipe(tap((data) => this.updateWeatherData(data)));
  }
}
