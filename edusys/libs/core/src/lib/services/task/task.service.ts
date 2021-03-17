import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { APP_CONFIG } from '@edusys/app-config';
import { assignTaskUrl, createTaskUrl, deleteTaskUrl, editTaskUrl, fetchTaskDetailUrl, fetchTaskListUrl, finishTaskUrl } from './task.endpoints';
import { ITaskAssignRequest, ITaskCreateRequest, ITaskDetailResponse, ITaskEditRequest, ITaskFinishRequest } from '@edusys/model';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  constructor(private httpClient: HttpClient, @Inject(APP_CONFIG) private appConfig: any) {}

  baseUrl(): string {
    return this.appConfig.apiUrl;
  }

  fetchTaskList = (): Observable<ITaskDetailResponse[]> => {
    return this.httpClient.get<ITaskDetailResponse[]>(fetchTaskListUrl(this.baseUrl()));
  };

  fetchTaskDetail = (taskId: string): Observable<ITaskDetailResponse> => {
    return this.httpClient.get<ITaskDetailResponse>(fetchTaskDetailUrl(this.baseUrl(), taskId));
  };

  createTask = (payload: ITaskCreateRequest): Observable<ITaskDetailResponse> => {
    return this.httpClient.post<ITaskDetailResponse>(createTaskUrl(this.baseUrl()), payload);
  };

  assignTask = (taskId: string, payload: ITaskAssignRequest): Observable<ITaskDetailResponse> => {
    return this.httpClient.post<ITaskDetailResponse>(assignTaskUrl(this.baseUrl(), taskId), payload);
  };

  finishTask = (taskId: string, payload: ITaskFinishRequest): Observable<ITaskDetailResponse> => {
    return this.httpClient.post<ITaskDetailResponse>(finishTaskUrl(this.baseUrl(), taskId), payload);
  };

  editTask = (taskId: string, payload: ITaskEditRequest): Observable<ITaskDetailResponse> => {
    return this.httpClient.patch<ITaskDetailResponse>(editTaskUrl(this.baseUrl(), taskId), payload);
  };

  deleteTask = (taskId: string): Observable<void> => {
    return this.httpClient.delete<void>(deleteTaskUrl(this.baseUrl(), taskId));
  };
}
