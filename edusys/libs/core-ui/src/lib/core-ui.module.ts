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
import { MatTooltipModule } from '@angular/material/tooltip';
import { UiEmptyListComponent } from './components/ui-empty-list/ui-empty-list.component';
// import { TranslateModule } from '@ngx-translate/core';
import { UiBreadcrumbComponent } from './components/ui-breadcrumb/ui-breadcrumb.component';
import { UiAddressComponent } from './components/ui-address/ui-address.component';
import { UiFormErrorComponent } from './components/ui-form-error/ui-form-error.component';

@NgModule({
  imports: [
    CommonModule,
    CoreTranslateModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatIconModule,
    MatButtonModule,
    MatTooltipModule,
  ],
  exports: [UiAmountComponent, UiDividerComponent, UiEmptyListComponent, UiBreadcrumbComponent, UiAddressComponent, CoreTranslateModule, UiFormErrorComponent],
  declarations: [
    UiAmountComponent,
    UiDividerComponent,
    UiEmptyListComponent,
    UiBreadcrumbComponent,
    UiBreadcrumbComponent,
    UiAddressComponent,
    UiFormErrorComponent,
  ],
})
export class CoreUiModule {}
