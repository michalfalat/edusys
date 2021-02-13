import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UiAmountComponent } from './components/ui-amount/ui-amount.component';
import { CoreTranslateModule } from '@edusys/core-translate';
import { MatInputModule } from '@angular/material/input';
import { UiDividerComponent } from './components/ui-divider/ui-divider.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { UiEmptyListComponent } from './components/ui-empty-list/ui-empty-list.component';
import { TranslateModule } from '@ngx-translate/core';
import { UiBreadcrumbComponent } from './components/ui-breadcrumb/ui-breadcrumb.component';

@NgModule({
  imports: [
    CommonModule,
    CoreTranslateModule,
    TranslateModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatIconModule,
    MatButtonModule,
  ],
  exports: [UiAmountComponent, UiDividerComponent, UiEmptyListComponent, UiBreadcrumbComponent],
  declarations: [UiAmountComponent, UiDividerComponent, UiEmptyListComponent, UiBreadcrumbComponent, UiBreadcrumbComponent],
})
export class CoreUiModule {}
