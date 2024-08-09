import { Component, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { WeatherService } from './weather.service';
import { SearchComponent } from './search/search.component';
import { ToggleButton } from './toggle-button/toggle-button.component';
import { Forecast } from './forecast/forecast.component';
import { CurrentWeather } from './current-weather/current-weather.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet, 
    FormsModule, 
    SearchComponent, 
    ToggleButton, 
    CurrentWeather, 
    Forecast],
  template: `
  <main class="container-fluid">
    <div class="row">
		  <div class="col-md-6">
        <city-search 
          (locationTitle)="setTitle($event)"
          (searchError)="handleSearchError($event)">
        </city-search>
      </div>
      <div class="col-md-6">
        @if(location) {
          <h3>Current weather in {{ location }}</h3>
        }
        @if(weatherData) {
          <current-weather></current-weather>
          <forecast></forecast>
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
  @Input() currentWeatherData: any;
  @Input() forecastData: any;
  title = 'weather-app';
  location: string = '';
  weatherData: any;
  errorMessage: string = '';
  // forecastData: any;
  // currentWeatherData: any;
  timeZone = 'America/New_York';
  
  constructor(public weatherService: WeatherService) {
    this.weatherService.weatherData$.subscribe((weatherData) => {
      this.weatherData = weatherData;
    });
  }

  setTitle(data: string) {
    this.location = data;
  }

  handleSearchError(error: string) {
    this.errorMessage = error;
  }

  // ngOnInit() {
  //   this.getWeatherForDefaultCity('Chicago');
  // }

    //   this.weatherService.getCoordinates(this.cityName.trim()).pipe(
  //     switchMap((coords) => {
  //       return this.weatherService.getWeatherByCity(coords, units);
  //     })
  //   ).subscribe((data) => {
  //     this.weatherData = data;
  //     console.log(data);
  //   });

    // getWeatherForDefaultCity() {
  //   this.weatherService.getCoordinates(this.cityName.trim()).pipe(
  //     switchMap((coords) => {
  //       return this.weatherService.getWeatherByCity(coords, units);
  //     })
  //   ).subscribe((data) => {
  //     this.weatherData = data;
  //     console.log(data);
  //   });

  //   // this.weatherService.getWeatherByCity('Chicago')
  //   //   .subscribe((data) => {
  //   //     this.weatherData = data;
  //   //     console.log(data);
  //   //   });
  // }

  // getWeatherForDefaultCity(city: string) {
  //   //access weather service, fetch coordinates from city name
  //   this.weatherService.fetchCoordinates(city).subscribe(
  //     data => {
  //       //pass fetched coordinate data to fetch weather
  //       this.weatherService.setCoordinates(data[0].lat, data[0].lon);
  //       this.weatherService.getWeather().subscribe(
  //         data => {
  //           this.weatherData = data;
  //           console.log('Original Weather Data:', this.weatherData)
            
  //           const unixTimestamp = data.current.dt;
  //           this.currentWeatherData = { 
  //             ...data.current, 
  //             currentDate: this.weatherService.convertUnixToTimeZone(unixTimestamp, this.timeZone)
  //           };
  //           console.log('Converted Current Weather Data:', this.currentWeatherData);

  //           this.forecastData = data.daily.map((item: any) => {
  //             const { dt } = item;
  //             const forecastDate = this.weatherService.convertUnixToTimeZone(dt, this.timeZone);
  //             return { forecastDate, ...item };
  //           });
  //           console.log('Converted Forecast Data:', this.forecastData);
  //         },
  //         error => {
  //           console.error('Weather fetching error:', error);
  //         });
  //     },
  //     error => {
  //       console.error('Geocoding error:', error);
  //     }
  //   )
  // }
}
