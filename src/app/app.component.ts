import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { WeatherService } from './weather.service';

import { SearchComponent } from './search/search.component';
import { ToggleButton } from './toggle-button/toggle-button.component';
import { SearchButton } from './search-button/search-button.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormsModule, SearchComponent, ToggleButton, SearchButton],
  template: `
  <main class="container">
    <div class="row">
		  <div class="col-md-6">
        <city-search></city-search>
        <toggle-button></toggle-button>
        <search-button></search-button>
      </div>
      <div class="col-md-6">
      </div>
    </div>
  </main>
`,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'weather-app';
  cityName: string = '';
  isChecked: boolean = false;
  coordData: any;
  weatherData: any;

  constructor(private weatherService: WeatherService) { }

  ngOnInit(): void {
    this.getWeatherForDefaultCity();
  }

  getCoords() {
    this.weatherService.getCoordinates('Chicago')
    .subscribe((data) => {
      this.coordData = data;
      console.log(data);
      // this.getWeather(data);
    });
  }

  getWeatherForDefaultCity() {
    let units = this.isChecked ? 'imperial' : 'metric';

    this.weatherService.getWeatherByCity('Chicago', units)
      .subscribe((data) => {
        this.weatherData = data;
        console.log(data);
      });
  }

  getWeather() {
    if (this.cityName.trim() === '') {
      return;
    }

    let units = this.isChecked ? 'imperial' : 'metric';

    this.weatherService.getWeatherByCity(this.cityName.trim(), units)
      .subscribe((data) => {
        this.weatherData = data;
        console.log(data);
      });
  }
  
  toggleUnits() {
    this.isChecked = !this.isChecked;
    this.getWeather()
  }
}
