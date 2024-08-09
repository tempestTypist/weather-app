import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { WeatherService } from '../weather.service';
import { ToggleButton } from '../toggle-button/toggle-button.component';

@Component({
  selector: 'city-search',
  standalone: true,
  imports: [FormsModule, ToggleButton],
  template: `
  <label for="cityInput">Enter City:</label>
  <input 
    type="text" 
    id="cityInput" 
    name="city" 
    [(ngModel)]="city" 
    placeholder="New York"
    >  
  <toggle-button></toggle-button>
  <button (click)="search(city)" [disabled]="searchIsInvalid">Submit</button>
`,
  styleUrl: './search.component.css'
})
export class SearchComponent {
  @Input() isChecked: boolean = false;
  @Output() locationTitle: EventEmitter<string> = new EventEmitter();
  @Output() currentWeatherData: EventEmitter<any> = new EventEmitter();
  @Output() forecastData: EventEmitter<any> = new EventEmitter();
  @Output() searchError: EventEmitter<string> = new EventEmitter();

  searchIsInvalid = false;
  city: string = '';
  title: string = '';
  timeZone = 'America/New_York';
  weatherData: any;

  constructor(private weatherService: WeatherService) { 
    this.weatherService.weatherData$.subscribe((weatherData) => {
      this.weatherData = weatherData;
    });
  }

  search(city: string): void {
    if (city.trim() === '') {
      return console.log('invalid location');
    }
    //access weather service, fetch coordinates from city name
    this.weatherService.fetchCoordinates(city.trim()).subscribe(
      data => {
        //pass fetched coordinate data to fetch weather
        this.weatherService.setCoordinates(data[0].lat, data[0].lon);
        this.weatherService.getWeather().subscribe(
          data => {
            //takes the data fetched from api and runs it through processData function
            //assigns to processedData and updates weatherData in weather service
            const processedData = this.weatherService.processData(data);
            this.weatherService.updateWeatherData(processedData);
          },
          error => {
            console.error('Weather fetching error:', error);
          });
      },
      error => {
        console.error('Geocoding error:', error);
      }
    )
  }

  // processData(data: any): any {
  //   const unixTimestamp = data.current.dt;
  //   this.currentWeatherData = { 
  //     ...data.current, 
  //     currentDate: this.weatherService.convertUnixToTimeZone(unixTimestamp, this.timeZone)
  //   };
  //   console.log('Converted Current Weather Data:', this.currentWeatherData);

  //   this.forecastData = data.daily.map((item: any) => {
  //     const { dt } = item;
  //     const forecastDate = this.weatherService.convertUnixToTimeZone(dt, this.timeZone);
  //     return { forecastDate, ...item };
  //   });
  //   console.log('Converted Forecast Data:', this.forecastData);

  //   return {
  //     current: this.currentWeatherData,
  //     forecast: this.forecastData,
  //   };
  // }

  // getCoordinates(location: string): { lat: number; lon: number } {
  //   this.weatherService.fetchCoordinates(location.trim()).pipe(
  //     switchMap((coords) => {
  //       let lat = coords[0].lat
  //       let lon =  coords[0].lon
  //       let location = coords[0].name + ', ' + coords[0].country
  //       console.log(coords)
  //       this.locationTitle.emit(location)
  //       return { lat, lon };
  //     })
  //   );
  // }

    // this.weatherService.getCoordinates(this.location.trim()).pipe(
    //   switchMap((coords) => {
    //     let lat = coords[0].lat
    //     let lon =  coords[0].lon
    //     let location = coords[0].name + ', ' + coords[0].country
    //     console.log(coords)
    //     this.locationTitle.emit(location)
    //     return this.weatherService.getWeatherByCity(lat, lon, units);
    //   })
    // ).subscribe(
    // data => {
    //   console.log(data);
    //   this.weatherData.emit(data);
    // },
    // error => {
    //   this.searchError.emit(`Error occurred: ${error.message}`);
    // });
}
