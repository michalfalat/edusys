import { TaskPriority, TaskStatus, TaskType } from '@edusys/model';
import { Schema, model, Document } from 'mongoose';
import { IOrganization } from './organization.model';
import { IUser } from './user.model';

export interface ITask {
  _id?: any;
  name: string;
  description?: string;
  place: string;
  attachments?: any[];
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
        type: String,
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
  }
);

const TaskModel = model<ITaskDocument>('task', taskSchema);
export default TaskModel;
