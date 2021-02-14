import { Component, Injector, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { IOrganizationDetailResponse, IOrganizationEditRequest } from '@edusys/model';
import { OrganizationBaseContainer } from '../organization-base.container';

@Component({
  selector: 'edusys-organization-edit',
  templateUrl: './organization-edit.component.html',
  styleUrls: ['./organization-edit.component.scss'],
})
export class OrganizationEditComponent extends OrganizationBaseContainer implements OnInit {
  constructor(injector: Injector) {
    super(injector);
    this.setTitle('organization.edit.title');
    this.createForm({
      name: new FormControl(this.organizationDetail?.name, Validators.required),
      description: new FormControl(this.organizationDetail?.description),
    });
  }

  ngOnInit(): void {
    this.organizationFacade.fetchOrganizationDetail(this.organizationId, this.fillForm, this.navigateToOrganizationHome);
  }

  fillForm = (pack: IOrganizationDetailResponse): void => {
    this.form?.patchValue({ name: pack?.name, description: pack?.description });
  };

  onEditOrganization(): void {
    const request: IOrganizationEditRequest = {
      id: this.organizationId,
      name: this.form?.value.name,
      description: this.form?.value.description,
    };
    this.organizationFacade.editOrganization(this.organizationId, request, () => {
      this.navigateToOrganizationDetail(this.organizationId);
    });
  }
}
