export interface ILogDetailResponse {
  id: string;
  message: string;
  level: string;
  meta: any;
  createdAt?: string;
}

export interface ILogFilterRequest {
  page: number;
  pageSize: number;
  filter?: ILogFilterCriteria;
}

export interface ILogFilterCriteria {
  level?: string;
  keyword?: string;
  fromDate?: string;
  toDate?: string;
}
