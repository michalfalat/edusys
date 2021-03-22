import { Component, Injector, OnInit } from '@angular/core';
import { PackageBaseContainer } from '../package-base.container';

@Component({
  selector: 'edusys-package-home',
  templateUrl: './package-home.component.html',
  styleUrls: ['./package-home.component.scss'],
})
export class PackageHomeComponent extends PackageBaseContainer implements OnInit {
  displayedColumns: string[] = ['createdAt', 'name', 'annualPrice'];
  constructor(injector: Injector) {
    super(injector);
    this.setTitle('package.home.title');
    this.navigationItems = [
      {
        text: 'navigation.packages',
      },
    ];
  }

  ngOnInit(): void {
    this.packageFacade.fetchPackageList();
  }
}
