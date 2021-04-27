import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface IConfirmModalData {
  title: string;
  text: string;
}

@Component({
  selector: 'ui-confirm-modal',
  templateUrl: './ui-confirm-modal.component.html',
  styleUrls: ['./ui-confirm-modal.component.scss'],
})
export class UiConfirmModalComponent {
  constructor(public dialogRef: MatDialogRef<UiConfirmModalComponent>, @Inject(MAT_DIALOG_DATA) public data: IConfirmModalData) {}

  onClose(): void {
    this.dialogRef.close();
  }

  onDelete(): void {
    this.dialogRef.close(true);
  }
}
