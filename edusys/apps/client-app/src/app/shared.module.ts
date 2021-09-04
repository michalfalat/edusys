import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatSelectModule } from '@angular/material/select';
import { CoreUiModule } from '@edusys/core-ui';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatListModule } from '@angular/material/list';
import { CoreTranslateModule } from '@edusys/core-translate';
import { TranslateModule } from '@ngx-translate/core';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';

@NgModule({
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatToolbarModule,
    MatMenuModule,
    MatInputModule,
    MatButtonModule,
    MatDividerModule,
    MatIconModule,
    CoreUiModule,
    CoreTranslateModule,
    TranslateModule,
    NgxMatSelectSearchModule,
  ],
  declarations: [],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    CoreTranslateModule,
    MatToolbarModule,
    MatMenuModule,
    MatInputModule,
    MatButtonModule,
    MatSnackBarModule,
    MatCardModule,
    MatDividerModule,
    MatSelectModule,
    MatIconModule,
    MatTooltipModule,
    MatCheckboxModule,
    MatListModule,
    CoreUiModule,
    TranslateModule,
    NgxMatSelectSearchModule,
  ],
  providers: [],
})
export class SharedModule {}
