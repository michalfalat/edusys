import { Component, Injector, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { editCompanyInfoSchema, ICompanyInfoEditRequest } from '@edusys/model';
import { HomeBaseContainer } from '../home-base.container';

@Component({
  selector: 'home-company-info',
  templateUrl: './home-company-info.component.html',
  styleUrls: ['./home-company-info.component.scss'],
})
export class HomeCompanyInfoComponent extends HomeBaseContainer implements OnInit {
  isEditMode = false;

  constructor(injector: Injector) {
    super(injector);
    this.createForm(
      {
        id: new FormControl(this.companyInfo?.id),
        name: new FormControl(this.companyInfo?.name),
        businessId: new FormControl(this.companyInfo?.businessId),
        taxId: new FormControl(this.companyInfo?.taxId),
        registeredVAT: new FormControl(this.companyInfo?.registeredVAT),
        registrationNumberVAT: new FormControl(this.companyInfo?.registrationNumberVAT),
        address: this.fb.group({
          name: new FormControl(this.companyInfo?.address?.name),
          street: new FormControl(this.companyInfo?.address?.street),
          streetNumber: new FormControl(this.companyInfo?.address?.streetNumber),
          city: new FormControl(this.companyInfo?.address?.city),
          postalCode: new FormControl(this.companyInfo?.address?.postalCode),
          country: new FormControl(this.companyInfo?.address?.country),
        }),
        bank: this.fb.group({
          bankName: new FormControl(this.companyInfo?.bank?.bankName),
          IBAN: new FormControl(this.companyInfo?.bank?.IBAN),
          SWIFT: new FormControl(this.companyInfo?.bank?.SWIFT),
          currency: new FormControl(this.companyInfo?.bank?.currency),
        }),
      },
      editCompanyInfoSchema,
    );
  }

  ngOnInit(): void {
    this.organizationFacade.fetchCompanyInfoDetail((response) => {
      this.setForm(response);
    });
  }

  onEdit(): void {
    this.isEditMode = !this.isEditMode;
  }

  cancelEdit(): void {
    this.setForm(this.companyInfo);
    this.isEditMode = false;
  }

  onEditCompanyInfo(): void {
    const request: ICompanyInfoEditRequest = this.form.value;
    this.organizationFacade.editCompanyInfo(request, (response) => {
      this.setForm(response);
      this.isEditMode = false;
    });
  }
}
