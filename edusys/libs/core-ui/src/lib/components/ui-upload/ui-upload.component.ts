import { Overlay } from '@angular/cdk/overlay';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ControlContainer } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { FileFacade } from '@edusys/core';
import { FileType, IFileDetailResponse, IFileUploadRequest } from '@edusys/model';
import { UiGalleryComponent } from '../ui-gallery/ui-gallery.component';

@Component({
  selector: 'ui-upload',
  templateUrl: './ui-upload.component.html',
  styleUrls: ['./ui-upload.component.scss'],
})
export class UiUploadComponent implements OnInit {
  @Input() showErrors = true;
  @Input() attachments: IFileDetailResponse[];
  @Input() type: FileType = FileType.OTHER;
  @Input() readonly: boolean;
  @Input() accept: string = 'image/*';

  @Output() onUploadFinish = new EventEmitter<IFileDetailResponse>();

  constructor(public dialog: MatDialog, private overlay: Overlay, public controlContainer: ControlContainer, private fileFacade: FileFacade) {}

  ngOnInit(): void {}

  fileChange(event: any) {
    let fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      let file: File = fileList[0];
      let formData: FormData = new FormData();
      formData.append('type', this.type);
      formData.append('file', file, file.name);
      this.fileFacade.uploadFile(formData, (response: IFileDetailResponse) => {
        this.onUploadFinish.emit(response);
      });
    }
  }

  onAttachmentClick(attachment: IFileDetailResponse): void {
    const dialogRef = this.dialog.open(UiGalleryComponent, {
      scrollStrategy: this.overlay.scrollStrategies.noop(),
      maxHeight: '80vh', //you can adjust the value as per your view
      data: { attachments: [attachment] },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
    });
  }
}
