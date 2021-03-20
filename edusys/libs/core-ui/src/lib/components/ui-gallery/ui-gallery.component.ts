import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IFileDetailResponse } from '@edusys/model';

export interface IGalleryDialogData {
  activeAttachment: any;
  canDelete: boolean;
  attachments: IFileDetailResponse[];
}

export interface IDialogCloseResult {
  action: 'DELETE';
  data: IFileDetailResponse;
}

@Component({
  selector: 'ui-gallery',
  templateUrl: './ui-gallery.component.html',
  styleUrls: ['./ui-gallery.component.scss'],
})
export class UiGalleryComponent implements OnInit {
  constructor(public dialogRef: MatDialogRef<UiGalleryComponent>, @Inject(MAT_DIALOG_DATA) public data: IGalleryDialogData) {}

  onClose(): void {
    this.dialogRef.close();
  }

  onDelete(data: IFileDetailResponse): void {
    this.dialogRef.close({ action: 'DELETE', data });
  }

  ngOnInit(): void {}
}
