import { Component, Injector } from '@angular/core';
import { HomeBaseContainer } from '../home-base.container';

@Component({
  selector: 'edusys-home-landing',
  templateUrl: './home-landing.component.html',
  styleUrls: ['./home-landing.component.scss'],
})
export class HomeLandingComponent extends HomeBaseContainer {
  constructor(injector: Injector) {
    super(injector);
  }
}
