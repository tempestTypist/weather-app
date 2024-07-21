import { Component } from '@angular/core';

@Component({
  selector: 'toggle-button',
  standalone: true,
  template: `
  <div class="form-check form-switch">
    <input 
      class="form-check-input" 
      type="checkbox" 
      role="switch" 
      id="unitToggle" 
      name="units" 
      [(ngModel)]="isChecked" 
      (click)="toggleUnits()">
    <label class="form-check-label" for="unitToggle">{{ isChecked ? 'imperial' : 'metric' }}</label>
  </div>
`,
  styleUrl: './toggle-button.component.css'
})
export class ToggleButton {
  isChecked: boolean = false;

  toggleSwitch() {
    this.isChecked = !this.isChecked;
  }
}