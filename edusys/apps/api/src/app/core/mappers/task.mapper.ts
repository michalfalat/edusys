import { ITaskDetailResponse } from '@edusys/model';
import { ITask } from '../models/task.model';
import { userDetailMappper } from './auth.mapper';
import { organizationBasicMapper } from './organization.mapper';

export const taskDetailMapper = (data: ITask): ITaskDetailResponse => ({
  id: data._id,
  name: data.name,
  description: data.description,
  place: data.place,
  attachments: data.attachments,
  type: data.type,
  priority: data.priority,
  organization: !!data.organization ? organizationBasicMapper(data.organization) : null,
  status: data.status,
  estimatedDescription: data.estimatedDescription,
  estimatedFixOn: data.estimatedFixOn,
  createdBy: !!data.createdBy ? userDetailMappper(data.createdBy) : null,
  fixedBy: !!data.fixedBy ? userDetailMappper(data.fixedBy) : null,
  fixedOn: data.fixedOn,
  finalDescription: data.finalDescription,
});

export const taskListMapper = (data: ITask[]): ITaskDetailResponse[] => data?.map((d) => taskDetailMapper(d));
