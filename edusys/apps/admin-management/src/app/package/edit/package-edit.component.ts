import { Component, Injector, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
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
      annumPrices: this.fb.array(
        this.packageDetail?.annumPrices?.map(
          (price) =>
            new FormGroup({
              currency: new FormControl(price.currency, Validators.required),
              amount: new FormControl(price.amount, Validators.required),
            })
        ),
        Validators.required
      ),
      installationPrices: this.fb.array(
        this.packageDetail?.installationPrices?.map(
          (price) =>
            new FormGroup({
              currency: new FormControl(price.currency, Validators.required),
              amount: new FormControl(price.amount, Validators.required),
            })
        ),
        Validators.required
      ),
      moduleIds: new FormControl(
        this.packageDetail?.modules?.map((m) => m.id),
        Validators.required
      ),
    });
  }

  ngOnInit(): void {
    this.moduleFacade.fetchModuleList();
    this.packageFacade.fetchPackageDetail(this.packageId, this.fillForm, this.navigateToPackageHome);
  }

  fillForm = (pack: IPackageDetailResponse): void => {
    this.form?.patchValue({ name: pack?.name, description: pack?.description });
  };

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

  onEditPackage(): void {
    const request: IPackageEditRequest = {
      id: this.packageId,
      name: this.form?.value.name,
      description: this.form?.value.description,
      annumPrices: this.form?.value.annumPrices,
      installationPrices: this.form?.value.installationPrices,
      moduleIds: this.form?.value.moduleIds,
    };
    this.packageFacade.editPackage(this.packageId, request, () => {
      this.navigateToPackageDetail(this.packageId);
    });
  }
}
