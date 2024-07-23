import { Component } from '@angular/core';
import { WeatherService } from '../weather.service';
import { switchMap } from 'rxjs';

@Component({
  selector: 'search-button',
  standalone: true,
  imports: [],
  template: `
  <button (click)="getCoords()" [disabled]="searchIsInvalid">Submit</button>
`,
  styleUrl: './search-button.component.css'
})
export class SearchButton {
  searchIsInvalid = false;
  isChecked: boolean = false;
  cityName: string = '';
  weatherData: any;

  constructor(private weatherService: WeatherService) { }

  getCoords() {
    let units = this.isChecked ? 'imperial' : 'metric';

    if (this.cityName.trim() === '') {
      return;
    }

        this.weatherService.getCoordinates(this.cityName.trim())
      .subscribe((data) => {
        this.weatherData = data;
        console.log(data);
      });

    // this.weatherService.getCoordinates(this.cityName.trim()).pipe(
    //   switchMap((coords) => {
    //     return this.weatherService.getWeatherByCity(coords, units);
    //   })
    // ).subscribe((data) => {
    //   this.weatherData = data;
    //   console.log(data);
    // });
  }
}