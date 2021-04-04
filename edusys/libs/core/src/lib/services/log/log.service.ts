import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { APP_CONFIG } from '@edusys/app-config';
import { ILogDetailResponse, ILogFilterRequest, Pagination } from '@edusys/model';
import { Observable } from 'rxjs';
import { deleteLogUrl, fetchLogDetailUrl, fetchLogListUrl } from './log.endpoints';

@Injectable({
  providedIn: 'root',
})
export class LogService {
  constructor(private httpClient: HttpClient, @Inject(APP_CONFIG) private appConfig: any) {}

  baseUrl(): string {
    return this.appConfig.apiUrl;
  }

  fetchLogList = (request: ILogFilterRequest): Observable<Pagination<ILogDetailResponse>> => {
    return this.httpClient.post<Pagination<ILogDetailResponse>>(fetchLogListUrl(this.baseUrl()), request);
  };

  fetchLogDetail = (logId: string): Observable<ILogDetailResponse> => {
    return this.httpClient.get<ILogDetailResponse>(fetchLogDetailUrl(this.baseUrl(), logId));
  };

  deleteLog = (logId: string): Observable<void> => {
    return this.httpClient.delete<void>(deleteLogUrl(this.baseUrl(), logId));
  };
}
