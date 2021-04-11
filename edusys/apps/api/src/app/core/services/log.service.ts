import { ILogDetailResponse, ILogFilterCriteria, ILogFilterRequest } from '@edusys/model';
import { identity, pickBy } from 'lodash';
import { PaginateResult } from 'mongoose';
import { logDetailMapper, logPaginatedListMapper } from '../mappers/log.mapper';
import LogModel from '../models/log.model';
import { BadRequest, NotFound } from '../utils/errors';

export const listOfLogs = async (data: ILogFilterRequest): Promise<PaginateResult<ILogDetailResponse>> => {
  const listOfEntities = await LogModel.paginate(buildFilterCriteria(data?.filter), {
    page: data?.page || 1,
    limit: data?.pageSize || 5,
    offset: data?.page * data?.pageSize || 0,
    sort: { timestamp: -1 },
  });
  if (!listOfEntities) {
    throw new NotFound();
  }
  return logPaginatedListMapper(listOfEntities);
};

export const detailOfLog = async (id: string): Promise<ILogDetailResponse> => {
  const detailModel = await LogModel.findById(id);
  if (!detailModel) {
    throw new NotFound();
  }
  return logDetailMapper(detailModel);
};

export const deleteLog = async (id: string): Promise<void> => {
  try {
    await LogModel.findByIdAndDelete(id);
    return;
  } catch (error) {
    throw new BadRequest(error);
  }
};

const buildFilterCriteria = (data: ILogFilterCriteria): any => {
  const filter = {
    $and: [],
  };
  if (data?.fromDate || data?.toDate) {
    filter.$and.push({ timestamp: pickBy({ $gte: data?.fromDate, $lt: data?.toDate }, identity) });
  }
  if (data?.level) {
    filter.$and.push({ level: data?.level });
  }
  if (data?.keyword) {
    filter.$and.push({ $or: [{ message: { $regex: data.keyword, $options: 'i' } }, { 'meta.user': { $regex: data.keyword, $options: 'i' } }] });
  }

  return filter.$and.length ? filter : {};
};
