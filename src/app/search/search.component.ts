import { Component } from '@angular/core';

@Component({
  selector: 'city-search',
  standalone: true,
  imports: [],
  template: `
  <label for="cityInput">Enter City:</label>
  <input 
    type="text" 
    id="cityInput" 
    name="cityName" 
    [(ngModel)]="cityName" 
    placeholder="New York"
    >  
`,
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent {

}
