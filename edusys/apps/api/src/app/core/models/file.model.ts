import { FileType } from '@edusys/model';
import { Schema, model, Document } from 'mongoose';
import { IEntity } from './entity.model';
import { IUser } from './user.model';

export interface IFile extends IEntity {
  name: string;
  url: string;
  obsolete?: boolean;
  createdBy?: IUser['_id'];
  mimeType: string;
  type: FileType;
}

export interface IFileDocument extends IFile, Document {}

const fileSchema = new Schema<IFileDocument>(
  {
    name: {
      type: String,
      required: true,
      max: 512,
    },
    url: {
      type: String,
      max: 1024,
    },
    obsolete: {
      type: Boolean,
      default: false,
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: 'user',
    },
    mimeType: {
      type: String,
    },
    type: {
      type: FileType,
    },
  },
  {
    timestamps: true,
  },
);

const FileModel = model<IFileDocument>('file', fileSchema);
export default FileModel;
