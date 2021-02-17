import { Component, Input, OnInit } from '@angular/core';
import { ControlContainer } from '@angular/forms';

@Component({
  selector: 'ui-address',
  templateUrl: './ui-address.component.html',
  styleUrls: ['./ui-address.component.scss'],
})
export class UiAddressComponent implements OnInit {
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
  constructor(public controlContainer: ControlContainer) {}

  ngOnInit(): void {}
}
