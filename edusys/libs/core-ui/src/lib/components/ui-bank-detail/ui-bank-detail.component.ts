import { Component, Input } from '@angular/core';
import { ControlContainer } from '@angular/forms';

@Component({
  selector: 'ui-bank-detail',
  templateUrl: './ui-bank-detail.component.html',
  styleUrls: ['./ui-bank-detail.component.scss'],
})
export class UiBankDetailComponent {
  currencies = [
    {
      name: 'EUR',
      code: 'EUR',
    },
  ];

  @Input() showErrors = true;
  @Input() readonly: boolean;
  constructor(public controlContainer: ControlContainer) {}
}
