import { Component, Injector, OnInit } from '@angular/core';
import { TaskBaseContainer } from '../task-base.container';

@Component({
  selector: 'edusys-task-home',
  templateUrl: './task-home.component.html',
  styleUrls: ['./task-home.component.scss'],
})
export class TaskHomeComponent extends TaskBaseContainer implements OnInit {
  displayedColumns: string[] = ['organization', 'name', 'description', 'priority', 'status'];
  constructor(injector: Injector) {
    super(injector);
    this.navigationItems = [
      {
        text: 'navigation.tasks',
      },
    ];
  }

  ngOnInit(): void {
    this.taskFacade.fetchTaskList();
  }
}
