import { Component, Input, OnInit } from '@angular/core';
import { WeatherService } from '../weather.service';
import { combineLatest } from 'rxjs'

@Component({
  selector: 'current-weather',
  standalone: true,
  imports: [],
  template: `
  <div class="current-weather">
  @if(currentWeatherData) {
    <p>Temperature: {{ currentWeatherData.temp }} °{{ currentUnit === 'metric' ? 'C' : 'F' }}</p>
    <p>Humidity: {{ currentWeatherData.humidity }}%</p>
    <p>Weather: {{ currentWeatherData.weather[0].description }}</p>
    <p>weather icons: {{ currentWeatherData.weather[0].icon }}</p>
  }
  </div>
  `,
  styleUrl: './current-weather.component.css'
})
export class CurrentWeather implements OnInit {
  currentWeatherData: any;
  currentUnit: string = 'metric';

  constructor(private weatherService: WeatherService) { 
    this.weatherService.units$.subscribe(
      unit => { this.currentUnit = unit; },
      error => console.error('Error:', error));
  }

  ngOnInit(): void {
    this.weatherService.weatherData$.subscribe((data) => {
      if (data) {
        this.currentWeatherData = data.current;
      }
    });
  }
  // ngOnInit() {
  //   combineLatest([
  //     this.weatherService.units$, 
  //     this.weatherService.weatherData$
  //   ]).subscribe(
  //     ([unit, weatherData]) => {
  //       this.currentUnit = unit; 
  //       this.currentWeatherData = weatherData; 
  //     },
  //     error => console.error('Error:', error)
  //   );
  // }
}