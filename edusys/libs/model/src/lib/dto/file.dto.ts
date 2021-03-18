export interface IFileUploadRequest {
  name: string;
  type: FileType;
  data: any;
}

export interface IFileDetailResponse {
  id: any;
  name: string;
  mimeType: string;
  type: FileType;
  url: string;
}

export enum FileType {
  TASK_ATTACHMENT = 'TASK_ATTACHMENT',
  OTHER = 'OTHER',
}
