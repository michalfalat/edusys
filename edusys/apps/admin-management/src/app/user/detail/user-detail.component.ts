import { Component, Injector, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { editUserSchema, IUserDetailResponse, IUserEditRequest } from '@edusys/model';
import { UiConfirmModalComponent } from 'libs/core-ui/src/lib/components/ui-confirm-modal/ui-confirm-modal.component';
import { routes } from '../../utils/routes';
import { UserBaseContainer } from '../user-base.container';

@Component({
  selector: 'edusys-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss'],
})
export class UserDetailComponent extends UserBaseContainer implements OnInit {
  isEditMode: boolean;
  constructor(injector: Injector) {
    super(injector);
    this.isEditMode = this.activatedRoute.snapshot.data.isEditMode;
    this.setBreadcrumbNavigation();
    this.createForm(
      {
        id: new FormControl(this.userDetail?.id),
        name: new FormControl(this.userDetail?.name),
        surname: new FormControl(this.userDetail?.surname),
        email: new FormControl(this.userDetail?.email),
        phone: new FormControl(this.userDetail?.phone),
        organizations: new FormControl(this.userDetail?.organizations?.map((o) => o.id)),
      },
      editUserSchema
    );
  }

  ngOnInit(): void {
    this.organizationFacade.fetchOrganizationList();
    this.userFacade.fetchUserDetail(this.userId, this.setBreadcrumbNavigation, this.navigateToUserHome);
  }

  fillForm = (data: IUserDetailResponse): void => {
    if (!data) return;
    const { email, id, name, phone, surname, organizations } = data;
    this.form?.patchValue({ email, id, name, phone, surname, organizations: organizations?.map((m) => m.id) });
  };

  onEditUser(): void {
    const { email, id, name, phone, surname, organizations } = this.form?.value as IUserEditRequest;
    const request: IUserEditRequest = {
      email,
      id,
      name,
      phone,
      surname,
      organizations,
    };
    this.userFacade.editUser(
      this.userId,
      request,
      () => {
        this.onSuccess('general.saved.success');
        this.navigateToUserDetail(this.userId);
      },
      (err) => {
        this.onError(err.error?.message?.message);
      }
    );
  }

  setBreadcrumbNavigation = (response?: IUserDetailResponse): void => {
    const screenType = this.isEditMode ? 'user.edit.title' : 'user.detail.title';
    const detailName = this.userDetail?.fullname || response?.fullname || screenType;
    this.setTitle(screenType);
    this.fillForm(response);
    this.navigationItems = [
      {
        text: 'navigation.users',
        route: routes.user.home,
      },
      {
        text: detailName,
      },
    ];
  };

  showDeleteDialog(): void {
    const dialogRef = this.dialogService.open(UiConfirmModalComponent, {
      data: { title: 'general.delete.title', text: 'user.delete.text' },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (!!result)
        this.userFacade.deleteUser(
          this.userId,
          () => {
            this.onSuccess('general.delete.success');
            this.navigateToUserHome();
          },
          (err) => {
            this.onError(err.error?.message?.message);
          }
        );
    });
  }
}
