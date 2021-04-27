import { Component, Injector, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { editIdentifierSchema, IAuthUserBasicResponse, IIdentifierDetailResponse, IIdentifierEditRequest } from '@edusys/model';
import { UiConfirmModalComponent } from '@edusys/core-ui';
import { routes } from '../../utils/routes';
import { IdentifierBaseContainer } from '../identifier-base.container';

@Component({
  selector: 'edusys-identifier-detail',
  templateUrl: './identifier-detail.component.html',
  styleUrls: ['./identifier-detail.component.scss'],
})
export class IdentifierDetailComponent extends IdentifierBaseContainer implements OnInit {
  isEditMode: boolean;
  organizationUsers: IAuthUserBasicResponse[];

  constructor(injector: Injector) {
    super(injector);
    this.isEditMode = this.activatedRoute.snapshot.data.isEditMode;
    this.setBreadcrumbNavigation();
    this.createForm(
      {
        id: new FormControl(this.identifierDetail?.id),
        number: new FormControl(this.identifierDetail?.number),
        organizationId: new FormControl(this.identifierDetail?.organizationId),
        status: new FormControl(this.identifierDetail?.status),
        type: new FormControl(this.identifierDetail?.type),
        userId: new FormControl(this.identifierDetail?.user?.id),
        validUntil: new FormControl(this.identifierDetail?.validUntil),
        hasExpiration: new FormControl(!!this.identifierDetail?.validUntil),
      },
      editIdentifierSchema
    );
  }

  ngOnInit(): void {
    this.identifierFacade.fetchIdentifierDetail(this.identifierId, this.setBreadcrumbNavigation, this.navigateToIdentifierHome);
    if (!this.organizationList) this.organizationFacade.fetchOrganizationList();
  }

  organizationChanged(clearUser = false): void {
    const organizationId = this.form?.value?.organizationId;
    if (!organizationId) return;

    if (clearUser) {
      this.form?.patchValue({ userId: undefined });
    }

    this.organizationFacade.fetchOrganizationDetail(this.form?.value?.organizationId, (data) => {
      this.organizationUsers = data.users;
    });
  }

  fillForm = (data: IIdentifierDetailResponse): void => {
    this.form?.patchValue({
      id: data?.id,
      number: data?.number,
      organizationId: data.organizationId,
      status: data?.status,
      type: data?.type,
      userId: data?.user?.id,
      validUntil: data?.validUntil,
      hasExpiration: !!data?.validUntil,
    });
    this.organizationChanged();
  };

  setBreadcrumbNavigation = (response?: IIdentifierDetailResponse): void => {
    const screenType = 'identifier.detail.title';
    const detailName = this.identifierDetail?.number || response?.number || screenType;
    this.setTitle(screenType);
    this.fillForm(response);
    this.navigationItems = [
      {
        text: 'navigation.identifiers',
        route: routes.identifier.home,
      },
      {
        text: `${detailName}`,
      },
    ];
  };

  showDeleteDialog(): void {
    const diaidentifierRef = this.dialogService.open(UiConfirmModalComponent, {
      data: { title: 'general.delete.title', text: 'identifier.delete.text' },
    });

    diaidentifierRef.afterClosed().subscribe((result) => {
      if (result)
        this.identifierFacade.deleteIdentifier(this.identifierId, () => {
          this.navigateToIdentifierHome();
        });
    });
  }

  onEditIdentifier(): void {
    const request: IIdentifierEditRequest = {
      id: this.identifierId,
      number: this.form?.value?.number,
      organizationId: this.form?.value?.organizationId,
      status: this.form?.value?.status,
      type: this.form?.value?.type,
      userId: this.form?.value?.userId,
      validUntil: this.form?.value?.hasExpiration ? this.form?.value?.validUntil : null,
    };
    this.identifierFacade.editIdentifier(
      this.identifierId,
      request,
      () => {
        this.onSuccess('general.saved.success');
        this.navigateToIdentifierDetail(this.identifierId);
      },
      (err) => {
        this.onError(err);
      }
    );
  }
}
