import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { WeatherService } from './weather.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'weather-app';
  cityName: string = '';
  weatherData: any;

  constructor(private weatherService: WeatherService) { }

  ngOnInit(): void {
    this.getWeatherForDefaultCity();
  }

  getWeatherForDefaultCity() {
    this.weatherService.getWeatherByCity('Chicago')
      .subscribe((data) => {
        this.weatherData = data;
        console.log(data);
      });
  }

  getWeather() {
    if (this.cityName.trim() === '') {
      return;
    }

    this.weatherService.getWeatherByCity(this.cityName.trim())
      .subscribe((data) => {
        this.weatherData = data;
        console.log(data);
      });
  }
}
