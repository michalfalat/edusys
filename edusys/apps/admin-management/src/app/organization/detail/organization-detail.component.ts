import { Component, Injector, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { editOrganizationSchema, IOrganizationDetailResponse, IOrganizationEditRequest } from '@edusys/model';
import { UiConfirmModalComponent } from 'libs/core-ui/src/lib/components/ui-confirm-modal/ui-confirm-modal.component';
import { routes } from '../../utils/routes';
import { OrganizationBaseContainer } from '../organization-base.container';

@Component({
  selector: 'edusys-organization-detail',
  templateUrl: './organization-detail.component.html',
  styleUrls: ['./organization-detail.component.scss'],
})
export class OrganizationDetailComponent extends OrganizationBaseContainer implements OnInit {
  isEditMode: boolean;
  constructor(injector: Injector) {
    super(injector);
    this.isEditMode = this.activatedRoute.snapshot.data.isEditMode;
    this.setTitle(this.isEditMode ? 'organization.edit.title' : 'organization.detail.title');
    this.setBreadcrumbNavigation();
    this.createForm(
      {
        id: new FormControl(this.organizationDetail?.id),
        info: this.fb.group({
          owner: new FormControl(this.organizationDetail?.owner?.id),
          name: new FormControl(this.organizationDetail?.name),
          description: new FormControl(this.organizationDetail?.description),
          businessId: new FormControl(this.organizationDetail?.businessId),
          registrationNumberVAT: new FormControl(this.organizationDetail?.registrationNumberVAT),
          taxId: new FormControl(this.organizationDetail?.taxId),
        }),
        address: this.fb.group({
          name: new FormControl(this.organizationDetail?.address?.name),
          street: new FormControl(this.organizationDetail?.address?.street),
          streetNumber: new FormControl(this.organizationDetail?.address?.streetNumber),
          city: new FormControl(this.organizationDetail?.address?.city),
          postalCode: new FormControl(this.organizationDetail?.address?.postalCode),
          country: new FormControl(this.organizationDetail?.address?.country),
        }),
        packageId: new FormControl(this.organizationDetail?.packageId),
      },
      editOrganizationSchema
    );
  }

  ngOnInit(): void {
    this.organizationFacade.fetchOrganizationDetail(this.organizationId, this.setBreadcrumbNavigation, this.navigateToOrganizationHome);
    if (!this.packages) this.packageFacade.fetchPackageList();
    if (!this.users) this.userFacade.fetchUserList();
  }

  deleteOrganization(): void {
    this.organizationFacade.deleteOrganization(this.organizationId, this.navigateToOrganizationHome);
  }

  fillForm = (data: IOrganizationDetailResponse): void => {
    this.form?.patchValue({
      id: data?.id,
      info: {
        owner: data?.owner?.id,
        name: data?.name,
        description: data?.description,
        businessId: data?.businessId,
        registrationNumberVAT: data?.registrationNumberVAT,
        taxId: data?.taxId,
      },
      address: data?.address,
      package: data?.packageId,
    }); //TODO
  };

  setBreadcrumbNavigation = (response?: IOrganizationDetailResponse): void => {
    const screenType = this.isEditMode ? 'organization.edit.title' : 'organization.detail.title';
    const detailName = this.organizationDetail?.name || response?.name || screenType;
    this.setTitle(screenType);
    this.fillForm(response);
    this.navigationItems = [
      {
        text: 'navigation.organizations',
        route: routes.organization.home,
      },
      {
        text: detailName,
      },
    ];
  };

  showDeleteDialog(): void {
    const dialogRef = this.dialogService.open(UiConfirmModalComponent, {
      data: { title: 'general.delete.title', text: 'organization.delete.text' },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (!!result)
        this.organizationFacade.deleteOrganization(
          this.organizationId,
          () => {
            this.onSuccess('general.delete.success');
            this.navigateToOrganizationHome();
          },
          (err) => {
            this.onError(err);
          }
        );
    });
  }

  onEditOrganization(): void {
    const { id, info, packageId, address } = this.form?.value as IOrganizationEditRequest;
    const request: IOrganizationEditRequest = {
      id,
      info,
      packageId,
      address,
    };
    this.organizationFacade.editOrganization(
      this.organizationId,
      request,
      () => {
        this.onSuccess('general.saved.success');
        this.navigateToOrganizationDetail(this.organizationId);
      },
      (err) => {
        this.onError(err);
      }
    );
  }
}
