import { TaskPriority, TaskStatus, TaskType } from '@edusys/model';
import { Schema, model, Document, PaginateModel } from 'mongoose';
import { IEntity } from './entity.model';
import { IFile } from './file.model';
import { IOrganization } from './organization.model';
import { IUser } from './user.model';
import * as paginate from 'mongoose-paginate-v2';

export interface ITask extends IEntity {
  name: string;
  description?: string;
  place: string;
  attachments?: IFile['_id'][];
  type: TaskType;
  priority: TaskPriority;
  organization?: IOrganization['_id'];
  status: TaskStatus;
  estimatedDescription?: string;
  estimatedFixOn?: Date;
  createdBy: IUser['_id'];
  fixedBy?: IUser['_id'];
  fixedOn?: Date;
  finalDescription?: string;
}

export interface ITaskDocument extends ITask, Document {}

const taskSchema = new Schema<ITaskDocument>(
  {
    name: {
      type: String,
      required: true,
      max: 255,
    },
    description: {
      type: String,
      max: 1024,
    },
    place: {
      type: String,
      max: 512,
    },
    attachments: [
      {
        type: Schema.Types.ObjectId,
        ref: 'file',
      },
    ],
    type: {
      type: TaskType,
      required: true,
    },
    priority: {
      type: TaskPriority,
      required: true,
    },
    status: {
      type: TaskStatus,
      required: true,
    },
    organization: {
      type: Schema.Types.ObjectId,
      ref: 'organization',
    },
    estimatedDescription: {
      type: String,
      max: 1024,
    },
    estimatedFixOn: {
      type: Date,
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: 'user',
    },
    fixedBy: {
      type: Schema.Types.ObjectId,
      ref: 'user',
    },
    fixedOn: {
      type: Date,
    },
    finalDescription: {
      type: String,
      max: 1024,
    },
  },
  {
    timestamps: true,
  },
);

taskSchema.plugin(paginate);

type TaskModel<T extends Document> = PaginateModel<T>;

const TaskModel: TaskModel<ITaskDocument> = model<ITaskDocument>('task', taskSchema) as TaskModel<ITaskDocument>;
export default TaskModel;
