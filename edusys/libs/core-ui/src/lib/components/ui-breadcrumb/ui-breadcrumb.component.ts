import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CoreTranslateService } from '@edusys/core-translate';

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
  @Output() onNavigationItemClick = new EventEmitter<INavigationItem>();

  constructor(public tr: CoreTranslateService) {}

  onItemClick(item: INavigationItem): void {
    if (!!item.route) {
      this.onNavigationItemClick.emit(item);
    }
  }

  ngOnInit(): void {}
}
