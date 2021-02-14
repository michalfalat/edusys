import { Component, Injector, OnInit } from '@angular/core';
import { PackageBaseContainer } from '../package-base.container';

@Component({
  selector: 'edusys-package-home',
  templateUrl: './package-home.component.html',
  styleUrls: ['./package-home.component.scss'],
})
export class PackageHomeComponent extends PackageBaseContainer implements OnInit {
  displayedColumns: string[] = ['name', 'description'];
  constructor(injector: Injector) {
    super(injector);
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