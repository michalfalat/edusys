import { Overlay } from '@angular/cdk/overlay';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ControlContainer } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { FileFacade } from '@edusys/core';
import { FileType, IFileDetailResponse } from '@edusys/model';
import { UiGalleryComponent } from '../ui-gallery/ui-gallery.component';

@Component({
  selector: 'ui-upload',
  templateUrl: './ui-upload.component.html',
  styleUrls: ['./ui-upload.component.scss'],
})
export class UiUploadComponent {
  @Input() showErrors = true;
  @Input() attachments: IFileDetailResponse[];
  @Input() type: FileType = FileType.OTHER;
  @Input() readonly: boolean;
  @Input() accept = 'image/*';

  @Output() onUploadFinish = new EventEmitter<IFileDetailResponse>();
  @Output() onRemoveFile = new EventEmitter<IFileDetailResponse>();

  constructor(public dialog: MatDialog, private overlay: Overlay, public controlContainer: ControlContainer, private fileFacade: FileFacade) {}

  fileChange(event: any) {
    const fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      const file: File = fileList[0];
      const formData: FormData = new FormData();
      formData.append('type', this.type);
      formData.append('file', file, file.name);
      this.fileFacade.uploadFile(formData, (response: IFileDetailResponse) => {
        event.srcElement.value = null;
        this.onUploadFinish.emit(response);
      });
    }
  }

  onAttachmentClick(attachment: IFileDetailResponse): void {
    const dialogRef = this.dialog.open(UiGalleryComponent, {
      scrollStrategy: this.overlay.scrollStrategies.noop(),
      maxHeight: '70vh',
      data: { attachments: [attachment], canDelete: !this.readonly },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result?.action === 'DELETE') {
        this.onRemoveFile.emit(result?.data);
      }
      console.log('The dialog was closed', result);
    });
  }

  trackByFileId(index: number, item: IFileDetailResponse) {
    return item.id;
  }
}
