import { Component, Injector, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ISubscriptionDetailResponse, ISubscriptionEditRequest } from '@edusys/model';
import { UiConfirmModalComponent } from '@edusys/core-ui';
import { routes } from '../../utils/routes';
import { SubscriptionBaseContainer } from '../subscription-base.container';

@Component({
  selector: 'edusys-subscription-detail',
  templateUrl: './subscription-detail.component.html',
  styleUrls: ['./subscription-detail.component.scss'],
})
export class SubscriptionDetailComponent extends SubscriptionBaseContainer implements OnInit {
  isEditMode: boolean;
  constructor(injector: Injector) {
    super(injector);
    this.isEditMode = this.activatedRoute.snapshot.data.isEditMode;
    this.setBreadcrumbNavigation();
    this.createForm({
      id: new FormControl(this.subscriptionDetail?.id),
      name: new FormControl(this.subscriptionDetail?.name),
      description: new FormControl(this.subscriptionDetail?.description),
      packageId: new FormControl(this.subscriptionDetail?.package?.id),
      status: new FormControl(this.subscriptionDetail?.status),
      reference: new FormControl(this.subscriptionDetail?.reference),
      finalPrice: new FormControl(this.subscriptionDetail?.finalPrice),
    });
  }

  ngOnInit(): void {
    this.subscriptionFacade.fetchSubscriptionDetail(this.subscriptionId, this.setBreadcrumbNavigation, this.navigateToSubscriptionHome);
  }

  fillForm = (data: ISubscriptionDetailResponse): void => {
    if (!data) return;
    const { id, name, description, status, reference, finalPrice } = data;
    this.form?.patchValue({ id, name, description, packageId: data?.package?.id, status, reference, finalPrice });
  };

  setBreadcrumbNavigation = (response?: ISubscriptionDetailResponse): void => {
    const screenType = 'subscription.detail.title';
    const detailName = this.subscriptionDetail?.name || response?.name || screenType;
    this.setTitle(screenType);
    this.fillForm(response);
    this.navigationItems = [
      {
        text: 'navigation.subscriptions',
        route: routes.subscription.home,
      },
      {
        text: `${detailName} - ${new Date(this.subscriptionDetail?.createdAt)?.toLocaleDateString()}`,
      },
    ];
  };

  showDeleteDialog(): void {
    const dialogRef = this.dialogService.open(UiConfirmModalComponent, {
      data: { title: 'general.delete.title', text: 'subscription.delete.text' },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result)
        this.subscriptionFacade.deleteSubscription(this.subscriptionId, () => {
          this.navigateToSubscriptionHome();
        });
    });
  }

  onEditSubscription(): void {
    const request: ISubscriptionEditRequest = {
      id: this.subscriptionId,
      organizationId: this.form?.value?.organizationId,
      status: this.form?.value?.status,
      reference: this.form?.value?.reference,
      package: this.form?.value?.packageId,
      name: this.form?.value?.name,
      description: this.form?.value?.description,
      validUntil: this.form?.value?.validUntil,
      finalPrice: this.form?.value?.finalPrice,
      discount: this.form?.value?.discount,
      discountPercentage: this.form?.value?.discountPercentage,
    };
    this.subscriptionFacade.editSubscription(
      this.subscriptionId,
      request,
      () => {
        this.onSuccess('general.saved.success');
        this.navigateToSubscriptionDetail(this.subscriptionId);
      },
      (err) => {
        this.onError(err);
      },
    );
  }
}
