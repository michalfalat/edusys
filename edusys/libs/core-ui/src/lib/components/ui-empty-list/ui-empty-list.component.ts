import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'ui-empty-list',
  templateUrl: './ui-empty-list.component.html',
  styleUrls: ['./ui-empty-list.component.scss'],
})
export class UiEmptyListComponent implements OnInit {
  @Input() message: string;
  @Input() buttonText: string;
  @Output() onAdd = new EventEmitter();
  constructor() {}

  ngOnInit(): void {}
}
