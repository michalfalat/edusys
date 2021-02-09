import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UiAmountComponent } from './components/ui-amount/ui-amount.component';
import { CoreTranslateModule } from '@edusys/core-translate';
import { MatInputModule } from '@angular/material/input';
import { UiDividerComponent } from './components/ui-divider/ui-divider.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  imports: [CommonModule, CoreTranslateModule, MatInputModule, FormsModule, ReactiveFormsModule, MatSelectModule, MatIconModule],
  exports: [UiAmountComponent, UiDividerComponent],
  declarations: [UiAmountComponent, UiDividerComponent],
})
export class CoreUiModule {}
