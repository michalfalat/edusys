import { Component, Input, OnInit } from '@angular/core';

export interface INavigationItem {
  text: string;
  route?: string;
}

@Component({
  selector: 'ui-breadcrumb',
  templateUrl: './ui-breadcrumb.component.html',
  styleUrls: ['./ui-breadcrumb.component.scss'],
})
export class UiBreadcrumbComponent implements OnInit {
  @Input() showHome: boolean;
  @Input() navigationItems: INavigationItem[];

  constructor() {}

  ngOnInit(): void {}
}
