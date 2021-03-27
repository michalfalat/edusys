import { Component, Injector, OnInit } from '@angular/core';
import { FormArray, FormControl, Validators } from '@angular/forms';
import { createUserSchema, IUserCreateRequest } from '@edusys/model';
import { routes } from '../../utils/routes';
import { UserBaseContainer } from '../user-base.container';

@Component({
  selector: 'edusys-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.scss'],
})
export class UserCreateComponent extends UserBaseContainer implements OnInit {
  constructor(injector: Injector) {
    super(injector);
    this.navigationItems = [
      {
        text: 'navigation.users',
        route: routes.user.home,
      },
      {
        text: 'general.new',
      },
    ];
    this.setTitle('user.home.title');
    this.createForm(
      {
        email: new FormControl(''),
        name: new FormControl(''),
        surname: new FormControl(''),
        organizations: new FormControl(''),
        phone: new FormControl(''),
      },
      createUserSchema
    );
  }

  ngOnInit(): void {
    this.organizationFacade.fetchOrganizationList();
  }

  onCreateUser(): void {
    const request: IUserCreateRequest = {
      email: this.form?.value?.email,
      name: this.form?.value?.name,
      surname: this.form?.value?.surname,
      organizations: this.form?.value?.organizations,
      phone: this.form?.value?.phone,
    };
    this.userFacade.createUser(
      request,
      () => {
        this.onSuccess('user.create.success');
        this.navigateToUserHome();
      },
      (err) => {
        console.log(err);
        this.onError(err.error?.message?.message);
      }
    );
  }
}
