import { ITaskCreateRequest, ITaskDetailResponse, ITaskEditRequest, TaskStatus, ITaskAssignRequest, ITaskFinishRequest } from '@edusys/model';
import TaskModel from '../models/task.model';
import { taskDetailMapper, taskListMapper } from '../mappers/task.mapper';
import { BadRequest, NotFound } from '../utils/errors';
import { createTaskSchemaValidate, editTaskSchemaValidate, assignTaskSchemaValidate, finishTaskSchemaValidate } from '@edusys/model';
import { getCurrentUser } from '../middlewares/current-http-context';

// LIST OF ALL TASKS WITHOUT PAGINATION
export const listOfTasks = async (): Promise<ITaskDetailResponse[]> => {
  const listOfEntities = await TaskModel.find().populate('organization').populate('createdBy');
  if (!listOfEntities) {
    throw new NotFound();
  }
  return taskListMapper(listOfEntities);
};

// DETAIL OF TASK
export const detailOfTask = async (id: string): Promise<ITaskDetailResponse> => {
  const detailModel = await TaskModel.findById(id);
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
    attachments: payload.attachments,
    type: payload.type,
    priority: payload.priority,
    organization: payload.organizationId || getCurrentUser()?.organizationId,
    status: TaskStatus.NEW,
    createdBy: getCurrentUser()?.id,
  });
  try {
    const savedModel = await newModel.save();
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
      { new: true }
    );

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
      { new: true }
    );

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
    const updatedModel = await TaskModel.findByIdAndUpdate(id, payload, { new: true });
    return taskDetailMapper(updatedModel);
  } catch (error) {
    throw new BadRequest(error);
  }
};

// CANCEL TASK
export const deleteTask = async (id: string): Promise<void> => {
  try {
    await TaskModel.findByIdAndUpdate(id, { status: TaskStatus.CANCELED }, { new: true });
    return;
  } catch (error) {
    throw new BadRequest(error);
  }
};
