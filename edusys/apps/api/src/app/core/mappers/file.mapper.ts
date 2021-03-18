import { IFileDetailResponse } from '@edusys/model';
import { IFile } from '../models/file.model';

export const fileDetailMapper = (data: IFile, hostName: string): IFileDetailResponse => ({
  id: data._id,
  name: data.name,
  mimeType: data.mimeType,
  type: data.type,
  url: `${hostName}/${data.url}`,
});
