import { Component, Input, OnInit } from '@angular/core';
import { ControlContainer } from '@angular/forms';

@Component({
  selector: 'ui-upload',
  templateUrl: './ui-upload.component.html',
  styleUrls: ['./ui-upload.component.scss'],
})
export class UiUploadComponent implements OnInit {
  @Input() showErrors = true;
  @Input() readonly: boolean;
  constructor(public controlContainer: ControlContainer) {}

  ngOnInit(): void {}

  fileChange(event: any) {
    let fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      let file: File = fileList[0];
      let formData: FormData = new FormData();
      formData.append('uploadFile', file, file.name);
    }
  }
}
