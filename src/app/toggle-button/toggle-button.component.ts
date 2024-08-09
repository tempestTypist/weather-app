import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { WeatherService } from '../weather.service';

@Component({
  selector: 'toggle-button',
  standalone: true,
  imports: [FormsModule],
  template: `
  <div class="form-check form-switch">
    <input 
      class="form-check-input" 
      type="checkbox" 
      role="switch" 
      id="unitToggle" 
      name="units" 
      (click)="onUnitToggled()">
    <label class="form-check-label" for="unitToggle">Switch to {{ currentUnit === 'metric' ? 'Imperial' : 'Metric' }}</label>
  </div>
`,
  styleUrl: './toggle-button.component.css'
})
export class ToggleButton {
  weatherData: any;
  currentUnit: string = 'metric';

  constructor(private weatherService: WeatherService) { 
    this.weatherService.units$.subscribe(
      unit => { this.currentUnit = unit; },
      error => console.error('Error:', error));
  }

  onUnitToggled() {
    this.weatherService.toggleUnits();
    if (this.weatherData) {
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
    }
  }
}