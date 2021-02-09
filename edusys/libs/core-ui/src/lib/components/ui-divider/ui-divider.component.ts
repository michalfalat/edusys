import { Component, Input } from '@angular/core';

@Component({
  selector: 'ui-divider',
  templateUrl: './ui-divider.component.html',
  styleUrls: ['./ui-divider.component.scss'],
})
export class UiDividerComponent {
  @Input() solid: boolean;

  @Input() dotted: boolean;

  @Input() vertical: boolean;

  @Input() compact: boolean;

  constructor() {}
}
