import { Component, Injector, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { UiScanCardModalComponent } from '@edusys/core-ui';
import { createIdentifierSchema, IAuthUserBasicResponse, IdentifierType, IIdentifierCreateRequest } from '@edusys/model';
import { routes } from '../../utils/routes';
import { IdentifierBaseContainer } from '../identifier-base.container';

@Component({
  selector: 'edusys-identifier-create',
  templateUrl: './identifier-create.component.html',
  styleUrls: ['./identifier-create.component.scss'],
})
export class IdentifierCreateComponent extends IdentifierBaseContainer implements OnInit {
  organizationUsers: IAuthUserBasicResponse[];

  constructor(injector: Injector) {
    super(injector);
    this.navigationItems = [
      {
        text: 'navigation.identifiers',
        route: routes.identifier.home,
      },
      {
        text: 'general.new',
      },
    ];
    this.setTitle('identifier.home.title');
    this.createForm(
      {
        number: new FormControl(''),
        organizationId: new FormControl(),
        type: new FormControl(IdentifierType.CARD),
        userId: new FormControl(''),
        validUntil: new FormControl(),
      },
      createIdentifierSchema
    );
  }

  organizationChanged(): void {
    this.organizationFacade.fetchOrganizationDetail(this.form?.value?.organizationId, (data) => {
      this.organizationUsers = data.users;
    });
  }

  ngOnInit(): void {
    this.organizationFacade.fetchOrganizationList();
  }

  onCreateIdentifier(): void {
    const request: IIdentifierCreateRequest = {
      number: this.form?.value.number,
      organizationId: this.form?.value?.organizationId,
      type: this.form?.value?.type,
      userId: this.form?.value?.userId,
      validUntil: this.form?.value?.validUntil,
    };
    this.identifierFacade.createIdentifier(
      request,
      () => {
        this.onSuccess('general.saved.success');
        this.navigateToIdentifierHome();
      },
      (err) => this.onError(err)
    );
  }

  scanCardDialog(): void {
    const dialogRef = this.dialogService.open(UiScanCardModalComponent, {});

    dialogRef.afterClosed().subscribe((cardNumber) => {
      if (cardNumber) this.form.patchValue({ number: cardNumber });
    });
  }
}
