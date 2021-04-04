import { ILogDetailResponse } from '@edusys/model';
import { ILogDocument } from '../models/log.model';
import { PaginateResult } from 'mongoose';

export const logDetailMapper = (data: ILogDocument): ILogDetailResponse => ({
  id: data._id,
  level: data.level,
  message: data.message,
  meta: data.meta,
  createdAt: data.timestamp,
});

export const logPaginatedListMapper = (data: PaginateResult<ILogDocument>): PaginateResult<ILogDetailResponse> => {
  return {
    ...data,
    docs: data.docs?.map((d) => logDetailMapper(d)),
  };
};
