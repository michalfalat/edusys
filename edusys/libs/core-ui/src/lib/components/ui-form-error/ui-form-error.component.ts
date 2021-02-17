import { Component, Input, OnInit } from '@angular/core';
import { ControlContainer } from '@angular/forms';

@Component({
  selector: 'ui-form-error',
  templateUrl: './ui-form-error.component.html',
  styleUrls: ['./ui-form-error.component.scss'],
})
export class UiFormErrorComponent implements OnInit {
  @Input() name: string;
  constructor(public controlContainer: ControlContainer) {}

  ngOnInit(): void {
    // console.log(this.controlContainer.control.get(this.name));
  }
}
