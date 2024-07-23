import { Component, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { switchMap } from 'rxjs';
import { WeatherService } from '../weather.service';

@Component({
  selector: 'city-search',
  standalone: true,
  imports: [FormsModule],
  template: `
  <label for="cityInput">Enter City:</label>
  <input 
    type="text" 
    id="cityInput" 
    name="cityName" 
    [(ngModel)]="cityName" 
    placeholder="New York"
    >  
  <button (click)="getCoords()" [disabled]="searchIsInvalid">Submit</button>
`,
  // templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent {
  @Output() weatherData: EventEmitter<any> = new EventEmitter();
  searchIsInvalid = false;
  isChecked: boolean = false;
  cityName: string = '';

  constructor(private weatherService: WeatherService) { }

  getCoords() {
    let units = this.isChecked ? 'imperial' : 'metric';

    if (this.cityName.trim() === '') {
      return;
    }

    this.weatherService.getCoordinates(this.cityName.trim()).pipe(
      switchMap((coords) => {
        let lat = coords[0].lat
        let lon =  coords[0].lon
        return this.weatherService.getWeatherByCity(lat, lon, units);
      })
    ).subscribe((data) => {
      this.weatherData = data;
      console.log(data);
      this.weatherData.emit(data);
    });
  }
}
