import { Component, Input } from '@angular/core';
import { ControlContainer } from '@angular/forms';

@Component({
  selector: 'ui-address',
  templateUrl: './ui-address.component.html',
  styleUrls: ['./ui-address.component.scss'],
})
export class UiAddressComponent {
  countries = [
    {
      name: 'Slovensko',
      code: 'sk',
    },
    {
      name: 'Cesko',
      code: 'cz',
    },
  ];
  @Input() showErrors = true;
  @Input() readonly: boolean;
  constructor(public controlContainer: ControlContainer) {}
}
