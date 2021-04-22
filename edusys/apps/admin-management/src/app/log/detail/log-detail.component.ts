import { Component, Injector, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ILogDetailResponse } from '@edusys/model';
import { UiConfirmModalComponent } from '@edusys/core-ui';
import { routes } from '../../utils/routes';
import { LogBaseContainer } from '../log-base.container';

@Component({
  selector: 'edusys-log-detail',
  templateUrl: './log-detail.component.html',
  styleUrls: ['./log-detail.component.scss'],
})
export class LogDetailComponent extends LogBaseContainer implements OnInit {
  constructor(injector: Injector) {
    super(injector);
    this.setBreadcrumbNavigation();
    this.createForm({
      id: new FormControl(this.logDetail?.id),
      level: new FormControl(this.logDetail?.level),
      message: new FormControl(this.logDetail?.message),
      meta: new FormControl(this.logDetail?.meta),
    });
  }

  ngOnInit(): void {
    this.logFacade.fetchLogDetail(this.logId, this.setBreadcrumbNavigation, this.navigateToLogHome);
  }

  fillForm = (data: ILogDetailResponse): void => {
    this.form?.patchValue({ id: data?.id, level: data?.level, message: data.message, meta: data?.meta });
  };

  setBreadcrumbNavigation = (response?: ILogDetailResponse): void => {
    const screenType = 'log.detail.title';
    const detailName = this.logDetail?.level || response?.level || screenType;
    this.setTitle(screenType);
    this.fillForm(response);
    this.navigationItems = [
      {
        text: 'navigation.logs',
        route: routes.log.home,
      },
      {
        text: `${detailName} - ${new Date(this.logDetail?.createdAt)?.toLocaleDateString()}`,
      },
    ];
  };

  showDeleteDialog(): void {
    const dialogRef = this.dialogService.open(UiConfirmModalComponent, {
      data: { title: 'general.delete.title', text: 'log.delete.text' },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result)
        this.logFacade.deleteLog(this.logId, () => {
          this.navigateToLogHome();
        });
    });
  }
}
