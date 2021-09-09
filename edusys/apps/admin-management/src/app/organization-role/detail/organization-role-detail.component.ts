import { Component, Injector, OnInit } from '@angular/core';
import { FormArray, FormControl } from '@angular/forms';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { editOrganizationRoleSchema, IOrganizationRoleDetailResponse, IOrganizationRoleEditRequest } from '@edusys/model';
import { UiConfirmModalComponent } from '@edusys/core-ui';
import { routes } from '../../utils/routes';
import { OrganizationRoleBaseContainer } from '../organization-role-base.container';

@Component({
  selector: 'edusys-organization-role-detail',
  templateUrl: './organization-role-detail.component.html',
  styleUrls: ['./organization-role-detail.component.scss'],
})
export class OrganizationRoleDetailComponent extends OrganizationRoleBaseContainer implements OnInit {
  isEditMode: boolean;
  availablePermissions: string[];
  activeTab: number;

  constructor(injector: Injector) {
    super(injector);
    this.isEditMode = this.activatedRoute.snapshot.data.isEditMode;
    this.setBreadcrumbNavigation();
    this.createForm(
      {
        id: new FormControl(this.organizationRoleDetail?.id),
        name: new FormControl(this.organizationRoleDetail?.name),
        description: new FormControl(this.organizationRoleDetail?.description),
        permissions: this.fb.array(this.organizationRoleDetail?.permissions || []),
        status: new FormControl(this.organizationRoleDetail?.status),
        users: new FormControl(this.organizationRoleDetail?.users.map((u) => u.id) || []),
      },
      editOrganizationRoleSchema,
    );
    this.activeTab = this.activatedRoute.snapshot.queryParams.activeTab || 0;
  }

  ngOnInit(): void {
    this.organizationRoleFacade.fetchOrganizationRoleDetail(
      this.organizationRoleId,
      (data) => {
        this.organizationFacade.fetchOrganizationDetail(data.organizationId);
        this.setBreadcrumbNavigation(data);
      },
      this.navigateToOrganizationRoleHome,
    );
  }

  fillForm = (data: IOrganizationRoleDetailResponse): void => {
    if (!data) return;
    const { id, name, description, permissions, status, users } = data;
    this.form?.patchValue({ id, name, description, permissions, status, users: users.map((u) => u.id) || [] });
  };

  permissionChange(event: MatCheckboxChange, permission: string): void {
    if (event.checked) {
      this.addPermission(permission);
    } else {
      this.removePermission(permission);
    }
  }

  addPermission(permission: string): void {
    const control = <FormArray>this.form.get('permissions');
    control.push(this.fb.control(permission));
  }

  removePermission(permission: string): void {
    const control = <FormArray>this.form.get('permissions');
    control.removeAt(control.value.findIndex((p) => p === permission));
  }

  onEditOrganizationRole(): void {
    const { id, name, description, permissions, status, users } = this.form?.value as IOrganizationRoleEditRequest;
    const request: IOrganizationRoleEditRequest = {
      id,
      name,
      description,
      permissions,
      status,
      users,
    };
    this.organizationRoleFacade.editOrganizationRole(
      this.organizationRoleId,
      request,
      () => {
        this.onSuccess('general.saved.success');
        this.navigateToOrganizationRoleDetail(this.organizationRoleId, this.activeTab);
      },
      (err) => {
        this.onError(err.error?.message?.message);
      },
    );
  }

  setBreadcrumbNavigation = (response?: IOrganizationRoleDetailResponse): void => {
    const screenType = this.isEditMode ? 'organization_role.edit.title' : 'organization_role.detail.title';
    const detailName = this.organizationRoleDetail?.name || response?.name || screenType;
    this.setTitle(screenType);
    this.fillForm(response);
    this.navigationItems = [
      {
        text: 'navigation.organization_roles',
        route: routes.organizationRole.home,
      },
      {
        text: detailName,
      },
    ];
    if (!!this.organizationRoleDetail || !!response?.organizationId) {
      this.loadAvailablePermissions(this.organizationRoleDetail?.organizationId || response?.organizationId);
    }
  };

  loadAvailablePermissions(organizationId: string): void {
    this.organizationFacade.fetchOrganizationAvailablePermissions(organizationId, (data) => (this.availablePermissions = data));
  }

  showDeleteDialog(): void {
    const dialogRef = this.dialogService.open(UiConfirmModalComponent, {
      data: { title: 'general.delete.title', text: 'organization_role.delete.text' },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result)
        this.organizationRoleFacade.deleteOrganizationRole(
          this.organizationRoleId,
          () => {
            this.onSuccess('general.delete.success');
            this.navigateToOrganizationRoleHome();
          },
          (err) => {
            this.onError(err.error?.message?.message);
          },
        );
    });
  }

  saveActiveTab(event: MatTabChangeEvent): void {
    this.activeTab = event.index;
  }
}
