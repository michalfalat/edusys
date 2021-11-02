import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { INavigationItem } from '@edusys/core-ui';
import { IDashboardTaskData } from '@edusys/model';

@Component({
  selector: 'widget-task-data',
  templateUrl: './widget-task-data.component.html',
  styleUrls: ['./widget-task-data.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WidgetTaskDataComponent {
  @Input() taskData: IDashboardTaskData;
  navigationItems: INavigationItem[] = [
    {
      text: 'widget.taskData.title',
    },
  ];
  constructor() {}
}
