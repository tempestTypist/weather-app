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
        <city-search 
          (locationTitle)="setTitle($event)"
          (weatherData)="receiveWeatherData($event)" 
          (searchError)="handleSearchError($event)">
        </city-search>
        <toggle-button [isChecked]="toggleChecked" (isCheckedChange)="onToggleChange($event)"></toggle-button>
      </div>
      <div class="col-md-6">
      @if(location) {
        <h3>Current weather in {{ location }}</h3>
      }
      @if(receivedWeatherData) {
        <div>
          <p>Temperature: {{ receivedWeatherData.current.temp }}{{ toggleChecked ? '°F' : '°C'}}</p>
          <p>Humidity: {{ receivedWeatherData.current.humidity }}%</p>
          <p>Weather: {{ receivedWeatherData.current.weather[0].description }}</p>
          <p>weather icons: {{ receivedWeatherData.current.weather[0].icon }}</p>
        </div>
      }
      @if(errorMessage) {
        <p>{{ errorMessage }}</p>
      }
      </div>
    </div>
  </main>
`,
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'weather-app';
  location: string = '';
  receivedWeatherData: any;
  errorMessage: string = '';
  toggleChecked: boolean = false;

  constructor() {}

  setTitle(data: string) {
    this.location = data;
  }

  receiveWeatherData(data: any) {
    this.receivedWeatherData = data;
  }

  handleSearchError(error: string) {
    this.errorMessage = error;
  }

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
