import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ControlContainer } from '@angular/forms';

@Component({
  selector: 'ui-amount',
  templateUrl: './ui-amount.component.html',
  styleUrls: ['./ui-amount.component.scss'],
})
export class UiAmountComponent {
  @Input() label: string;
  @Output() onDelete = new EventEmitter<any>();

  constructor(public controlContainer: ControlContainer) {}
  currencyCodes = [
    {
      currency: 'EUR',
      symbol: '€',
    },
    {
      currency: 'CZK',
      symbol: 'Kč',
    },
    {
      currency: 'USD',
      symbol: '$',
    },
  ];
}
