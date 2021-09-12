import { EmailType } from '@edusys/email-sender';
import {
  assignTaskSchemaValidate,
  createTaskSchemaValidate,
  editTaskSchemaValidate,
  finishTaskSchemaValidate,
  ITaskAssignRequest,
  ITaskCreateRequest,
  ITaskDetailResponse,
  ITaskEditRequest,
  ITaskFilterRequest,
  ITaskFinishRequest,
  TaskStatus,
} from '@edusys/model';
import { PaginateResult } from 'mongoose';
import { taskDetailMapper, taskPaginatedListMapper } from '../mappers/task.mapper';
import { getCurrentUser } from '../middlewares/current-http-context';
import TaskModel from '../models/task.model';
import UserModel from '../models/user.model';
import { BadRequest, NotFound } from '../utils/errors';
import { logInfo } from '../utils/logger';
import { sendEmail } from './email.service';

// // LIST OF ALL TASKS WITHOUT PAGINATION
// export const listOfTasks = async (): Promise<ITaskDetailResponse[]> => {
//   const listOfEntities = await TaskModel.find().populate('organization').populate('createdBy');
//   if (!listOfEntities) {
//     throw new NotFound();
//   }
//   return taskListMapper(listOfEntities);
// };

export const listOfTasks = async (data: ITaskFilterRequest): Promise<PaginateResult<ITaskDetailResponse>> => {
  const listOfEntities = await TaskModel.paginate(buildFilterCriteria(data), {
    page: data?.page || 1,
    limit: data?.pageSize || 5,
    offset: data?.page * data?.pageSize || 0,
    sort: { createdAt: -1 },
    populate: ['organization', 'createdBy'],
  });
  if (!listOfEntities) {
    throw new NotFound();
  }
  return taskPaginatedListMapper(listOfEntities);
};

// DETAIL OF TASK
export const detailOfTask = async (id: string): Promise<ITaskDetailResponse> => {
  const detailModel = await TaskModel.findById(id).populate('organization').populate('createdBy').populate('attachments').populate('fixedBy');
  if (!detailModel) {
    throw new NotFound();
  }
  return taskDetailMapper(detailModel);
};

// CREATE NEW TASK
export const createTask = async (payload: ITaskCreateRequest): Promise<ITaskDetailResponse> => {
  const { error } = createTaskSchemaValidate(payload);
  if (!!error) {
    throw new BadRequest(error.details[0].message);
  }

  const newModel = new TaskModel({
    name: payload.name,
    description: payload.description,
    place: payload.place,
    attachments: payload.attachments.map((a) => a.id),
    type: payload.type,
    priority: payload.priority,
    organization: payload.organizationId || getCurrentUser()?.organizationId,
    status: TaskStatus.NEW,
    createdBy: getCurrentUser()?.id,
  });

  const recipient = (await UserModel.findById(getCurrentUser()?.id))?.email;

  try {
    const savedModel = await (await newModel.save()).populate('organization').execPopulate();
    console.log('ORGANIZATION: ', savedModel.organization);
    const url = 'www.edusys.sk/task/detail/131'; //`${getCurrentHostname()}/task/detail/${savedModel?.id}`; //TODO
    sendEmail(EmailType.TASK_NEW, recipient, {
      createdBy: recipient,
      taskDescription: savedModel.description,
      taskName: savedModel.name,
      taskPlace: savedModel.place,
      taskOrganization: savedModel?.organization?.name,
      taskPriority: savedModel.priority,
      url,
    });

    logInfo(`[TASK_SERVICE] task '${savedModel.name}' created with ${savedModel.priority} priority`);
    return taskDetailMapper(savedModel);
  } catch (error) {
    throw new BadRequest(error);
  }
};

// ASSIGN TASK
export const assignTask = async (payload: ITaskAssignRequest): Promise<ITaskDetailResponse> => {
  const { error } = assignTaskSchemaValidate(payload);
  if (!!error) {
    throw new BadRequest(error.details[0].message);
  }

  const detailModel = await TaskModel.findById(payload.id);
  if (!detailModel) {
    throw new NotFound();
  }

  try {
    const result = await TaskModel.findByIdAndUpdate(
      payload.id,
      {
        estimatedDescription: payload.estimatedDescription,
        estimatedFixOn: payload.estimatedFixOn,
        fixedBy: payload.fixedBy,
        status: TaskStatus.ASSIGNED,
      },
      { new: true },
    );

    logInfo(`[TASK_SERVICE] task '${result.name}' assigned to with ${payload.fixedBy}`);
    return taskDetailMapper(result);
  } catch (error) {
    throw new BadRequest(error);
  }
};

// FINISH TASK
export const finishTask = async (payload: ITaskFinishRequest): Promise<ITaskDetailResponse> => {
  const { error } = finishTaskSchemaValidate(payload);
  if (!!error) {
    throw new BadRequest(error.details[0].message);
  }

  const detailModel = await TaskModel.findById(payload.id);
  if (!detailModel) {
    throw new NotFound();
  }

  try {
    const result = await TaskModel.findByIdAndUpdate(
      payload.id,
      {
        finalDescription: payload.finalDescription,
        fixedOn: payload.fixedOn,
        status: TaskStatus.FIXED,
      },
      { new: true },
    );

    logInfo(`[TASK_SERVICE] task '${result.name}' finished`);
    return taskDetailMapper(result);
  } catch (error) {
    throw new BadRequest(error);
  }
};

// EDIT TASK
export const editTask = async (payload: ITaskEditRequest): Promise<ITaskDetailResponse> => {
  const { error } = editTaskSchemaValidate(payload);
  if (!!error) {
    throw new BadRequest(error.details[0].message);
  }
  try {
    const id = payload.id;
    const updatedModel = await TaskModel.findByIdAndUpdate(id, { ...payload, attachments: payload.attachments?.map((a) => a.id) }, { new: true });
    logInfo(`[TASK_SERVICE] task '${updatedModel.name}' edited`);
    return taskDetailMapper(updatedModel);
  } catch (error) {
    throw new BadRequest(error);
  }
};

// CANCEL TASK
export const deleteTask = async (id: string): Promise<void> => {
  try {
    const result = await TaskModel.findByIdAndUpdate(id, { status: TaskStatus.CANCELED }, { new: true });
    logInfo(`[TASK_SERVICE] task '${result.name}' changed status to CANCELED`);
    return;
  } catch (error) {
    throw new BadRequest(error);
  }
};

const buildFilterCriteria = (data: ITaskFilterRequest): any => {
  const filter = {
    $and: [],
  };
  if (data?.name) {
    filter.$and.push({ name: { $regex: data.name, $options: 'i' } });
  }
  if (data?.status) {
    filter.$and.push({ status: data?.status });
  }
  if (data?.organization) {
    filter.$and.push({ organization: data?.organization });
  }
  if (data?.place) {
    filter.$and.push({ place: data?.place });
  }
  if (data?.priority) {
    filter.$and.push({ priority: data?.priority });
  }
  if (data?.description) {
    filter.$and.push({ description: { $regex: data.description, $options: 'i' } });
  }

  return filter.$and.length ? filter : {};
};
