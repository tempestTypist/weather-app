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
  styleUrl: './search.component.css'
})
export class SearchComponent {
  @Output() locationTitle: EventEmitter<string> = new EventEmitter();
  @Output() weatherData: EventEmitter<any> = new EventEmitter();
  @Output() searchError: EventEmitter<string> = new EventEmitter();

  searchIsInvalid = false;
  isChecked: boolean = false;
  cityName: string = '';
  title: string = '';

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
        let location = coords[0].name + ', ' + coords[0].country
        console.log(coords)
        this.locationTitle.emit(location)
        return this.weatherService.getWeatherByCity(lat, lon, units);
      })
    ).subscribe(
    data => {
      console.log(data);
      this.weatherData.emit(data);
    },
    error => {
      this.searchError.emit(`Error occurred: ${error.message}`);
    });
  }
}
