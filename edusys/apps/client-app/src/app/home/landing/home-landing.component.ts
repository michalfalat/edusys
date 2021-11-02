import { Component, Injector, OnInit } from '@angular/core';
import { HomeBaseContainer } from '../home-base.container';

@Component({
  selector: 'edusys-home-landing',
  templateUrl: './home-landing.component.html',
  styleUrls: ['./home-landing.component.scss'],
})
export class HomeLandingComponent extends HomeBaseContainer implements OnInit {
  constructor(injector: Injector) {
    super(injector);
    this.setTitle('home.landing.title');
  }

  ngOnInit(): void {
    this.dashboardFacade.fetchDashboard();
  }
}
