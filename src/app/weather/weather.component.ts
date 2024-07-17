import { Component } from '@angular/core';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'app-weather',
  template: `
  Weather: <input type="text" [formControl]="weatherControl">
  `,
  standalone: true,
  imports: [],
  templateUrl: './weather.component.html',
  styleUrl: './weather.component.css'
})
export class WeatherComponent {
  weatherControl = new FormControl('');
}
