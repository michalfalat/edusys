import { Component, Injector, OnInit } from '@angular/core';
import { IPackageDetailResponse } from '@edusys/model';
import { routes } from '../../utils/routes';
import { PackageBaseContainer } from '../package-base.container';

@Component({
  selector: 'edusys-package-detail',
  templateUrl: './package-detail.component.html',
  styleUrls: ['./package-detail.component.scss'],
})
export class PackageDetailComponent extends PackageBaseContainer implements OnInit {
  constructor(injector: Injector) {
    super(injector);
    this.setBreadcrumbNavigation();
  }

  ngOnInit(): void {
    this.packageFacade.fetchPackageDetail(this.packageId, this.setBreadcrumbNavigation, this.navigateToPackageHome);
  }

  deletePackage(): void {
    this.packageFacade.deletePackage(this.packageId, this.navigateToPackageHome);
  }

  setBreadcrumbNavigation = (response?: IPackageDetailResponse): void => {
    this.navigationItems = [
      {
        text: 'navigation.packages',
        route: routes.package.home,
      },
      {
        text: this.packageDetail?.name || response?.name || 'Detail',
      },
    ];
  };
}
