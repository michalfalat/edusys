import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IFileDetailResponse } from '@edusys/model';

export interface IGalleryDialogData {
  activeAttachment: any;
  attachments: IFileDetailResponse[];
}

@Component({
  selector: 'ui-gallery',
  templateUrl: './ui-gallery.component.html',
  styleUrls: ['./ui-gallery.component.scss'],
})
export class UiGalleryComponent implements OnInit {
  constructor(public dialogRef: MatDialogRef<UiGalleryComponent>, @Inject(MAT_DIALOG_DATA) public data: IGalleryDialogData) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {}
}
