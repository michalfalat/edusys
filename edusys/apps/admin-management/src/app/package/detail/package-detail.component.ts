import { Component, Injector, OnInit } from '@angular/core';
import { PackageBaseContainer } from '../package-base.container';

@Component({
  selector: 'edusys-package-detail',
  templateUrl: './package-detail.component.html',
  styleUrls: ['./package-detail.component.scss'],
})
export class PackageDetailComponent extends PackageBaseContainer implements OnInit {
  constructor(injector: Injector) {
    super(injector);
  }

  ngOnInit(): void {
    this.packageFacade.fetchPackageDetail(this.packageId, null, this.navigateToPackageHome);
  }

  deletePackage(): void {
    this.packageFacade.deletePackage(this.packageId, this.navigateToPackageHome);
  }
}
