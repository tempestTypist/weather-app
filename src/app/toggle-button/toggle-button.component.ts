import { Component } from '@angular/core';

@Component({
  selector: 'toggle-button',
  standalone: true,
  templateUrl: './toggle-button.component.html',
  styleUrl: './toggle-button.component.css'
})
export class ToggleButtonComponent {
  // toggleButton = new FormControl('metric');
  isChecked: boolean = false;

  toggleSwitch() {
    this.isChecked = !this.isChecked;
  }
}