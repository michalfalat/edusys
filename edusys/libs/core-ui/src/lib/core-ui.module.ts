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
import { MatDialogModule } from '@angular/material/dialog';
import { UiEmptyListComponent } from './components/ui-empty-list/ui-empty-list.component';
// import { TranslateModule } from '@ngx-translate/core';
import { UiBreadcrumbComponent } from './components/ui-breadcrumb/ui-breadcrumb.component';
import { UiAddressComponent } from './components/ui-address/ui-address.component';
import { UiFormErrorComponent } from './components/ui-form-error/ui-form-error.component';
import { UiBankDetailComponent } from './components/ui-bank-detail/ui-bank-detail.component';
import { UiUploadComponent } from './components/ui-upload/ui-upload.component';
import { UiGalleryComponent } from './components/ui-gallery/ui-gallery.component';
import { UiConfirmModalComponent } from './components/ui-confirm-modal/ui-confirm-modal.component';
import { SelectByIdPipe } from './pipes/select-by-id.pipe';
import { DurationPipe } from './pipes/duration.pipe';

const pipes = [SelectByIdPipe, DurationPipe];

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
    MatDialogModule,
  ],
  exports: [
    ...pipes,
    UiAmountComponent,
    UiDividerComponent,
    UiEmptyListComponent,
    UiBreadcrumbComponent,
    UiAddressComponent,
    UiUploadComponent,
    UiGalleryComponent,
    UiBankDetailComponent,
    CoreTranslateModule,
    UiFormErrorComponent,
    UiConfirmModalComponent,
  ],
  declarations: [
    ...pipes,
    UiAmountComponent,
    UiDividerComponent,
    UiEmptyListComponent,
    UiBreadcrumbComponent,
    UiBreadcrumbComponent,
    UiAddressComponent,
    UiUploadComponent,
    UiGalleryComponent,
    UiFormErrorComponent,
    UiBankDetailComponent,
    UiConfirmModalComponent,
  ],
})
export class CoreUiModule {}
