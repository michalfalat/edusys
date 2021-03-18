import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { APP_CONFIG } from '@edusys/app-config';
import { uploadFileUrl, deleteFileUrl, fetchFileDetailUrl } from './file.endpoints';
import { IFileDetailResponse } from '@edusys/model';

@Injectable({
  providedIn: 'root',
})
export class FileService {
  constructor(private httpClient: HttpClient, @Inject(APP_CONFIG) private appConfig: any) {}

  baseUrl(): string {
    return this.appConfig.apiUrl;
  }

  fetchFileDetail = (fileId: string): Observable<IFileDetailResponse> => {
    return this.httpClient.get<IFileDetailResponse>(fetchFileDetailUrl(this.baseUrl(), fileId));
  };

  uploadFile = (payload: FormData): Observable<IFileDetailResponse> => {
    return this.httpClient.post<IFileDetailResponse>(uploadFileUrl(this.baseUrl()), payload);
  };

  deleteFile = (fileId: string, softDelete = false): Observable<void> => {
    return this.httpClient.delete<void>(deleteFileUrl(this.baseUrl(), fileId, softDelete));
  };
}
