import { ITaskDetailResponse } from '@edusys/model';
import { ITask } from '../models/task.model';
import { userDetailMapper } from './user.mapper';
import { fileDetailMapper } from './file.mapper';
import { organizationBasicMapper } from './organization.mapper';

export const taskDetailMapper = (data: ITask): ITaskDetailResponse => ({
  id: data._id,
  name: data.name,
  description: data.description,
  createdAt: data.createdAt,
  place: data.place,
  attachments: data.attachments?.map((a) => fileDetailMapper(a, process.env.APP_URL)),
  type: data.type,
  priority: data.priority,
  organization: !!data.organization ? organizationBasicMapper(data.organization) : null,
  status: data.status,
  estimatedDescription: data.estimatedDescription,
  estimatedFixOn: data.estimatedFixOn,
  createdBy: !!data.createdBy ? userDetailMapper(data.createdBy) : null,
  fixedBy: !!data.fixedBy ? userDetailMapper(data.fixedBy) : null,
  fixedOn: data.fixedOn,
  finalDescription: data.finalDescription,
});

export const taskListMapper = (data: ITask[]): ITaskDetailResponse[] => data?.map((d) => taskDetailMapper(d));
