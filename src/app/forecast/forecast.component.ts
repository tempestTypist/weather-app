import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../weather.service';

@Component({
  selector: 'forecast',
  standalone: true,
  imports: [],
  template: `
    @if(forecastData) {
      <div class="forecast">
        <div class="forecast-today">
          {{ forecastData[0].weather[0].icon }}
        </div>
        <div class="forecast-two">
          {{ forecastData[1].weather[0].icon }}
        </div>
        <div class="forecast-three">
          {{ forecastData[2].weather[0].icon }}
        </div>
        <div class="forecast-four">
          {{ forecastData[3].weather[0].icon }}
        </div>
        <div class="forecast-five">
          {{ forecastData[4].weather[0].icon }}
        </div>
        <div class="forecast-six">
          {{ forecastData[5].weather[0].icon }}
        </div>
        <div class="forecast-seven">
          {{ forecastData[6].weather[0].icon }}
        </div>
        <div class="forecast-eight">
          {{ forecastData[7].weather[0].icon }}
        </div>
      </div>
    }
  `,  
  styleUrl: './forecast.component.css'
})
export class Forecast implements OnInit {
  forecastData: any;
  currentUnit: string = 'metric';

  constructor(private weatherService: WeatherService) { 
    this.weatherService.units$.subscribe(
      unit => { this.currentUnit = unit; },
      error => console.error('Error:', error));
  }

  ngOnInit(): void {
    this.weatherService.weatherData$.subscribe((data) => {
      if (data) {
        this.forecastData = data.forecast;
      }
    });
  }
}
