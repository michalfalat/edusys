import { Component, Injector, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { IPackageDetailResponse, IPackageEditRequest } from '@edusys/model';
import { PackageBaseContainer } from '../package-base.container';

@Component({
  selector: 'edusys-package-edit',
  templateUrl: './package-edit.component.html',
  styleUrls: ['./package-edit.component.scss'],
})
export class PackageEditComponent extends PackageBaseContainer implements OnInit {
  constructor(injector: Injector) {
    super(injector);
    this.setTitle('package.edit.title');
    this.createForm({
      name: new FormControl(this.packageDetail?.name, Validators.required),
      description: new FormControl(this.packageDetail?.description, Validators.required),
    });
  }

  ngOnInit(): void {
    this.packageFacade.fetchPackageDetail(this.packageId, this.fillForm, this.navigateToPackageHome);
  }

  fillForm = (pack: IPackageDetailResponse): void => {
    this.form?.patchValue({ name: pack?.name, description: pack?.description });
  };

  onEditPackage(): void {
    const request: IPackageEditRequest = {
      id: this.packageId,
      name: this.form?.value.name,
      description: this.form?.value.description,
    };
    this.packageFacade.editPackage(this.packageId, request, () => {
      this.navigateToPackageDetail(this.packageId);
    });
  }
}
