import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'ui-scan-card-modal',
  templateUrl: './ui-scan-card-modal.component.html',
  styleUrls: ['./ui-scan-card-modal.component.scss'],
})
export class UiScanCardModalComponent {
  cardNumber: string;
  constructor(public dialogRef: MatDialogRef<UiScanCardModalComponent>) {}

  onClose(): void {
    this.dialogRef.close();
  }

  sendCardNumber(): void {
    console.log(this.cardNumber);
    this.dialogRef.close(this.cardNumber);
  }
}
