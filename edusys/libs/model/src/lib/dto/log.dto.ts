import { IPaginable } from './common.dto';

export interface ILogDetailResponse {
  id: string;
  message: string;
  level: string;
  meta: any;
  createdAt?: string;
}

export interface ILogFilterRequest extends IPaginable {
  level?: string;
  keyword?: string;
  fromDate?: string;
  toDate?: string;
}
