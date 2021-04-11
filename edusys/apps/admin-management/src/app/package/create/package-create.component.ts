import { Component, Injector, OnInit } from '@angular/core';
import { FormArray, FormControl, Validators } from '@angular/forms';
import { createPackageSchema, IPackageCreateRequest } from '@edusys/model';
import { routes } from '../../utils/routes';
import { PackageBaseContainer } from '../package-base.container';

@Component({
  selector: 'edusys-package-create',
  templateUrl: './package-create.component.html',
  styleUrls: ['./package-create.component.scss'],
})
export class PackageCreateComponent extends PackageBaseContainer implements OnInit {
  constructor(injector: Injector) {
    super(injector);
    this.navigationItems = [
      {
        text: 'navigation.packages',
        route: routes.package.home,
      },
      {
        text: 'general.new',
      },
    ];
    this.setTitle('package.home.title');
    this.createForm(
      {
        name: new FormControl(''),
        description: new FormControl(''),
        annumPrices: this.fb.array([]),
        installationPrices: this.fb.array([]),
        moduleIds: new FormControl([]),
      },
      createPackageSchema
    );
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

  deleteAnnumPrice(index: number): void {
    let control = <FormArray>this.form.get('annumPrices');
    control.removeAt(index);
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

  deleteInstallationPrice(index: number): void {
    let control = <FormArray>this.form.get('installationPrices');
    control.removeAt(index);
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
    this.packageFacade.createPackage(request, () => {
      this.onSuccess('general.saved.success');
      this.navigateToPackageHome;
    });
  }
}
