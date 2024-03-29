import { ITaskFilterRequest } from '@edusys/model';
import { pickBy } from 'lodash-es';
import { identity } from 'lodash-es';

export const fetchTaskListUrl = (baseUrl: string, request: ITaskFilterRequest) =>
  `${baseUrl}/api/task?${new URLSearchParams(pickBy(request, identity) as any).toString()}`;
export const fetchTaskDetailUrl = (baseUrl: string, taskId: string) => `${baseUrl}/api/task/${taskId}`;
export const createTaskUrl = (baseUrl: string) => `${baseUrl}/api/task`;
export const editTaskUrl = (baseUrl: string, taskId: string) => `${baseUrl}/api/task/${taskId}`;
export const assignTaskUrl = (baseUrl: string, taskId: string) => `${baseUrl}/api/task/${taskId}/assign`;
export const finishTaskUrl = (baseUrl: string, taskId: string) => `${baseUrl}/api/task/${taskId}/finish`;
export const deleteTaskUrl = (baseUrl: string, taskId: string) => `${baseUrl}/api/task/${taskId}`;
