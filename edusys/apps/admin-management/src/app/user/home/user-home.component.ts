import { Component, Injector, OnInit } from '@angular/core';
import { UserBaseContainer } from '../user-base.container';

@Component({
  selector: 'edusys-user-home',
  templateUrl: './user-home.component.html',
  styleUrls: ['./user-home.component.scss'],
})
export class UserHomeComponent extends UserBaseContainer implements OnInit {
  displayedColumns: string[] = ['createdAt', 'fullname', 'email'];
  constructor(injector: Injector) {
    super(injector);
    this.setTitle('user.home.title');
    this.navigationItems = [
      {
        text: 'navigation.users',
      },
    ];
  }

  ngOnInit(): void {
    this.userFacade.fetchUserList();
  }
}
