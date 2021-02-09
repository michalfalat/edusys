import { Component, Injector, OnInit } from '@angular/core';
import { FormArray, FormControl, Validators } from '@angular/forms';
import { IPackageCreateRequest } from '@edusys/model';
import { PackageBaseContainer } from '../package-base.container';

@Component({
  selector: 'edusys-package-create',
  templateUrl: './package-create.component.html',
  styleUrls: ['./package-create.component.scss'],
})
export class PackageCreateComponent extends PackageBaseContainer implements OnInit {
  constructor(injector: Injector) {
    super(injector);
    this.setTitle('package.home.title');
    this.createForm({
      name: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      annumPrices: this.fb.array([], Validators.required),
      installationPrices: this.fb.array([], Validators.required),
      moduleIds: new FormControl([], Validators.required),
    });
  }

  addAnnumPrice(): void {
    const control = <FormArray>this.form.get('annumPrices');
    control.push(
      this.fb.group({
        currency: new FormControl('EUR', Validators.required),
        amount: new FormControl('', Validators.required),
      })
    );
  }

  addInstallationPrice(): void {
    const control = <FormArray>this.form.get('installationPrices');
    control.push(
      this.fb.group({
        currency: new FormControl('EUR', Validators.required),
        amount: new FormControl('', Validators.required),
      })
    );
  }

  ngOnInit(): void {
    this.moduleFacade.fetchModuleList();
  }

  onCreatePackage(): void {
    const request: IPackageCreateRequest = {
      name: this.form?.value.name,
      description: this.form?.value.description,
      annumPrices: this.form?.value.annumPrices,
      installationPrices: this.form?.value.installationPrices,
      moduleIds: this.form?.value.moduleIds,
    };
    this.packageFacade.createPackage(request, this.navigateToPackageHome);
  }
}
