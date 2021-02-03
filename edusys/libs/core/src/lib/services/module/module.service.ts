import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { APP_CONFIG } from '@edusys/app-config';
import { createModuleUrl, deleteModuleUrl, editModuleUrl, fetchModuleDetailUrl, fetchModuleListUrl } from './module.endpoints';
import { IModuleCreateRequest, IModuleDetailResponse, IModuleEditRequest } from '@edusys/model';

@Injectable({
  providedIn: 'root',
})
export class ModuleService {
  constructor(private httpClient: HttpClient, @Inject(APP_CONFIG) private appConfig: any) {}

  baseUrl(): string {
    return this.appConfig.apiUrl;
  }

  fetchModuleList = (): Observable<IModuleDetailResponse[]> => {
    return this.httpClient.get<IModuleDetailResponse[]>(fetchModuleListUrl(this.baseUrl()));
  };

  fetchModuleDetail = (moduleId: string): Observable<IModuleDetailResponse> => {
    return this.httpClient.get<IModuleDetailResponse>(fetchModuleDetailUrl(this.baseUrl(), moduleId));
  };

  createModule = (payload: IModuleCreateRequest): Observable<IModuleDetailResponse> => {
    return this.httpClient.post<IModuleDetailResponse>(createModuleUrl(this.baseUrl()), payload);
  };

  editModule = (moduleId: string, payload: IModuleEditRequest): Observable<IModuleDetailResponse> => {
    return this.httpClient.patch<IModuleDetailResponse>(editModuleUrl(this.baseUrl(), moduleId), payload);
  };

  deleteModule = (moduleId: string): Observable<void> => {
    return this.httpClient.delete<void>(deleteModuleUrl(this.baseUrl(), moduleId));
  };
}
