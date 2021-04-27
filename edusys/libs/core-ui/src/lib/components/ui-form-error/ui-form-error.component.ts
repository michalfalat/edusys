import { Component, Input } from '@angular/core';
import { ControlContainer } from '@angular/forms';

@Component({
  selector: 'ui-form-error',
  templateUrl: './ui-form-error.component.html',
  styleUrls: ['./ui-form-error.component.scss'],
})
export class UiFormErrorComponent {
  @Input() name: string;
  constructor(public controlContainer: ControlContainer) {}
}
