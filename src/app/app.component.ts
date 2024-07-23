import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { WeatherService } from './weather.service';
import { switchMap } from 'rxjs';

import { SearchComponent } from './search/search.component';
import { ToggleButton } from './toggle-button/toggle-button.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormsModule, SearchComponent, ToggleButton],
  template: `
  <main class="container">
    <div class="row">
		  <div class="col-md-6">
        <city-search></city-search>
        <toggle-button [isChecked]="toggleChecked" (isCheckedChange)="onToggleChange($event)"></toggle-button>
      </div>
      <div class="col-md-6">
      <p>{{ toggleChecked ? '°F' : '°C'}}</p>
      @if(weatherData) {
        <div>
          <h3>Current Weather in {{ weatherData.city.name }}, {{ weatherData.city.country }}</h3>
          <p>Temperature: {{ weatherData.list[0].main.temp }}{{ toggleChecked ? '°F' : '°C'}}</p>
          <p>Humidity: {{ weatherData.list[0].main.humidity }}%</p>
          <p>Weather: {{ weatherData.list[0].main.weather[0].description }}</p>
          <p>weather icons: {{ weatherData.list[0].main.weather[0].icon }}</p>
        </div>
      }
      </div>
    </div>
  </main>
`,
  // templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'weather-app';
  weatherData: any;
  toggleChecked: boolean = false;

  constructor() {}

  onToggleChange(checked: boolean) {
    this.toggleChecked = checked;
  }
  // constructor(private weatherService: WeatherService) { }

  // ngOnInit(): void {
  //   this.getWeatherForDefaultCity();
  // }

  // getCoords() {
  //   let units = this.isChecked ? 'imperial' : 'metric';

  //   if (this.cityName.trim() === '') {
  //     return;
  //   }

  //   this.weatherService.getCoordinates(this.cityName.trim()).pipe(
  //     switchMap((coords) => {
  //       return this.weatherService.getWeatherByCity(coords, units);
  //     })
  //   ).subscribe((data) => {
  //     this.weatherData = data;
  //     console.log(data);
  //   });
  // }

  // getWeatherForDefaultCity() {
  //   let units = this.isChecked ? 'imperial' : 'metric';

  //   this.weatherService.getWeatherByCity('Chicago', units)
  //     .subscribe((data) => {
  //       this.weatherData = data;
  //       console.log(data);
  //     });
  // }

  // getWeather() {
  //   if (this.cityName.trim() === '') {
  //     return;
  //   }

  //   let units = this.isChecked ? 'imperial' : 'metric';

  //   this.weatherService.getWeatherByCity(this.cityName.trim(), units)
  //     .subscribe((data) => {
  //       this.weatherData = data;
  //       console.log(data);
  //     });
  // }

}
