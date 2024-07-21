import { Component } from '@angular/core';

@Component({
  selector: 'search-button',
  standalone: true,
  imports: [],
  template: `
  <button type="submit" [disabled]="searchIsInvalid">Submit</button>
`,
  styleUrl: './search-button.component.css'
})
export class SearchButton {
  searchIsInvalid = false;
}