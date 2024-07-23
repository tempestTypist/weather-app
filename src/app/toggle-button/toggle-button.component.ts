import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';

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
      (click)="toggleSwitch()">
    <label class="form-check-label" for="unitToggle">{{ isChecked ? 'imperial' : 'metric' }}</label>
  </div>
`,
  styleUrl: './toggle-button.component.css'
})
export class ToggleButton {
  @Input() isChecked: boolean = false;
  @Output() isCheckedChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor() { }

  toggleSwitch() {
    this.isChecked = !this.isChecked;
    this.isCheckedChange.emit(this.isChecked);
  }
}