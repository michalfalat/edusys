import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { ITaskCreateRequest, ITaskDetailResponse, ITaskEditRequest, ITaskFilterRequest, Pagination } from '@edusys/model';
import { taskCreateRequestAction, taskDeleteRequestAction, taskDetailRequestAction, taskEditRequestAction, taskListRequestAction } from './task.actions';
import { getTaskDetail, getTaskList } from './task.selectors';
import ITaskState from './task.reducer';

@Injectable({
  providedIn: 'root',
})
export class TaskFacade {
  constructor(private store: Store<ITaskState>) {}
  getTaskList$ = this.store.pipe(select(getTaskList));
  getTaskDetail$ = this.store.pipe(select(getTaskDetail));

  fetchTaskList(
    request: ITaskFilterRequest,
    onSucceeded?: (response: Pagination<ITaskDetailResponse>) => void,
    onError?: (response: HttpErrorResponse) => void,
  ): void {
    this.store.dispatch(taskListRequestAction({ request, onSucceeded, onError }));
  }

  fetchTaskDetail(taskId: string, onSucceeded?: (response: ITaskDetailResponse) => void, onError?: (response: HttpErrorResponse) => void): void {
    this.store.dispatch(taskDetailRequestAction({ taskId, onSucceeded, onError }));
  }

  editTask(
    taskId: string,
    payload: ITaskEditRequest,
    onSucceeded?: (response: ITaskDetailResponse) => void,
    onError?: (response: HttpErrorResponse) => void,
  ): void {
    this.store.dispatch(taskEditRequestAction({ taskId, payload, onSucceeded, onError }));
  }

  createTask(payload: ITaskCreateRequest, onSucceeded?: (response: ITaskDetailResponse) => void, onError?: (response: HttpErrorResponse) => void): void {
    this.store.dispatch(taskCreateRequestAction({ payload, onSucceeded, onError }));
  }

  deleteTask(taskId: string, onSucceeded?: () => void, onError?: (response: HttpErrorResponse) => void): void {
    this.store.dispatch(taskDeleteRequestAction({ taskId, onSucceeded, onError }));
  }
}
