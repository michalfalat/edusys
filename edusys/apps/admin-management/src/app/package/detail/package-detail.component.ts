import { Component, Injector, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { editPackageSchema, IAmount, IPackageDetailResponse, IPackageEditRequest } from '@edusys/model';
import { UiConfirmModalComponent } from 'libs/core-ui/src/lib/components/ui-confirm-modal/ui-confirm-modal.component';
import { routes } from '../../utils/routes';
import { PackageBaseContainer } from '../package-base.container';

@Component({
  selector: 'edusys-package-detail',
  templateUrl: './package-detail.component.html',
  styleUrls: ['./package-detail.component.scss'],
})
export class PackageDetailComponent extends PackageBaseContainer implements OnInit {
  isEditMode: boolean;
  constructor(injector: Injector) {
    super(injector);
    this.isEditMode = this.activatedRoute.snapshot.data.isEditMode;
    this.setBreadcrumbNavigation();
    this.createForm(
      {
        id: new FormControl(this.packageDetail?.id),
        name: new FormControl(this.packageDetail?.name),
        description: new FormControl(this.packageDetail?.description),
        annumPrices: this.fb.array(this.packageDetail?.annumPrices?.map((price) => this.buildAmountFormGroup(price)) || []),
        installationPrices: this.fb.array(this.packageDetail?.installationPrices?.map((price) => this.buildAmountFormGroup(price)) || []),
        moduleIds: new FormControl(this.packageDetail?.modules?.map((m) => m.id)),
      },
      editPackageSchema
    );
  }

  ngOnInit(): void {
    this.moduleFacade.fetchModuleList();
    this.packageFacade.fetchPackageDetail(this.packageId, this.setBreadcrumbNavigation, this.navigateToPackageHome);
  }

  buildAmountFormGroup(data: IAmount): FormGroup {
    return new FormGroup({
      currency: new FormControl(data?.currency, Validators.required),
      amount: new FormControl(data?.amount, Validators.required),
    });
  }

  fillForm = (data: IPackageDetailResponse): void => {
    this.form?.patchValue({ id: data?.id, name: data?.name, description: data?.description, moduleIds: data.modules?.map((m) => m.id) }); //TODO

    this.form?.setControl('annumPrices', this.fb.array(data.annumPrices?.map((price) => this.buildAmountFormGroup(price)) || []));
    this.form?.setControl('installationPrices', this.fb.array(data.installationPrices?.map((price) => this.buildAmountFormGroup(price)) || []));
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

  setBreadcrumbNavigation = (response?: IPackageDetailResponse): void => {
    const screenType = this.isEditMode ? 'package.edit.title' : 'package.detail.title';
    const detailName = this.packageDetail?.name || response?.name || screenType;
    this.setTitle(screenType);
    this.fillForm(response);
    this.navigationItems = [
      {
        text: 'navigation.packages',
        route: routes.package.home,
      },
      {
        text: detailName,
      },
    ];
  };

  showDeleteDialog(): void {
    const dialogRef = this.dialogService.open(UiConfirmModalComponent, {
      data: { title: 'general.delete.title', text: 'package.delete.text' },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (!!result)
        this.packageFacade.deletePackage(this.packageId, () => {
          this.navigateToPackageHome();
        });
    });
  }
}
