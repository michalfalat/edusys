import { IAuthUserBasicResponse } from './user.dto';
import { IFileDetailResponse } from './file.dto';
import { IOrganizationResponse } from './organization.dto';

export enum TaskStatus {
  NEW = 'NEW',
  ASSIGNED = 'ASSIGNED',
  FIXED = 'FIXED',
  CANCELED = 'CANCELED',
}

export enum TaskType {
  IT = 'IT',
  OTHER = 'OTHER',
}

export enum TaskPriority {
  LOW = 'LOW',
  MEDIUM = 'MEDIUM',
  HIGH = 'HIGH',
  ULTRA_HIGH = 'ULTRA_HIGH',
}

export interface ITaskCreateRequest {
  name: string;
  description?: string;
  place: string;
  organizationId?: string;
  attachments?: IFileDetailResponse[];
  type: TaskType;
  priority: TaskPriority;
}

export interface ITaskAssignRequest {
  id: string;
  estimatedDescription: string;
  estimatedFixOn: Date;
  fixedBy: string;
}

export interface ITaskFinishRequest {
  id: string;
  finalDescription: string;
  fixedOn: Date;
}

export interface ITaskDetailResponse {
  id: string;
  name: string;
  createdAt: string;
  updatedAt?: string;
  description?: string;
  place: string;
  attachments?: IFileDetailResponse[];
  type: TaskType;
  priority: TaskPriority;
  organization?: IOrganizationResponse;
  status: TaskStatus;
  estimatedDescription?: string;
  estimatedFixOn?: Date;
  createdBy: IAuthUserBasicResponse;
  fixedBy?: IAuthUserBasicResponse;
  fixedOn?: Date;
  finalDescription?: string;
}

export interface ITaskEditRequest {
  id: string;
  name: string;
  description?: string;
  place: string;
  attachments?: any[];
  type: TaskType;
  priority: TaskPriority;
  organizationId?: string;
  status: TaskStatus;
  estimatedDescription?: string;
  estimatedFixOn?: Date;
  createdBy?: string;
  fixedBy?: string;
  fixedOn?: Date;
  finalDescription?: string;
}
