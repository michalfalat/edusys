import { Component, Injector, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ISubscriptionDetailResponse } from '@edusys/model';
import { UiConfirmModalComponent } from '@edusys/core-ui';
import { routes } from '../../utils/routes';
import { SubscriptionBaseContainer } from '../subscription-base.container';

@Component({
  selector: 'edusys-subscription-detail',
  templateUrl: './subscription-detail.component.html',
  styleUrls: ['./subscription-detail.component.scss'],
})
export class SubscriptionDetailComponent extends SubscriptionBaseContainer implements OnInit {
  constructor(injector: Injector) {
    super(injector);
    this.setBreadcrumbNavigation();
    this.createForm({
      id: new FormControl(this.subscriptionDetail?.id),
      name: new FormControl(this.subscriptionDetail?.name),
      description: new FormControl(this.subscriptionDetail?.description), // TODO
    });
  }

  ngOnInit(): void {
    this.subscriptionFacade.fetchSubscriptionDetail(this.subscriptionId, this.setBreadcrumbNavigation, this.navigateToSubscriptionHome);
  }

  fillForm = (data: ISubscriptionDetailResponse): void => {
    this.form?.patchValue({ id: data?.id, name: data?.name, description: data.description });
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

  showDeleteDiasubscription(): void {
    const diasubscriptionRef = this.dialogService.open(UiConfirmModalComponent, {
      data: { title: 'general.delete.title', text: 'subscription.delete.text' },
    });

    diasubscriptionRef.afterClosed().subscribe((result) => {
      if (result)
        this.subscriptionFacade.deleteSubscription(this.subscriptionId, () => {
          this.navigateToSubscriptionHome();
        });
    });
  }
}
