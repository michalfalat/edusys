import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { APP_CONFIG } from '@edusys/app-config';
import { IIdentifierDetailResponse, IIdentifierFilterRequest, IIdentifierEditRequest, Pagination, IIdentifierCreateRequest } from '@edusys/model';
import { Observable } from 'rxjs';
import { deleteIdentifierUrl, editIdentifierUrl, fetchIdentifierDetailUrl, fetchIdentifierListUrl, createIdentifierUrl } from './identifier.endpoints';

@Injectable({
  providedIn: 'root',
})
export class IdentifierService {
  constructor(private httpClient: HttpClient, @Inject(APP_CONFIG) private appConfig: any) {}

  baseUrl(): string {
    return this.appConfig.apiUrl;
  }

  fetchIdentifierList = (request: IIdentifierFilterRequest): Observable<Pagination<IIdentifierDetailResponse>> => {
    return this.httpClient.get<Pagination<IIdentifierDetailResponse>>(fetchIdentifierListUrl(this.baseUrl(), request));
  };

  fetchIdentifierDetail = (identifierId: string): Observable<IIdentifierDetailResponse> => {
    return this.httpClient.get<IIdentifierDetailResponse>(fetchIdentifierDetailUrl(this.baseUrl(), identifierId));
  };

  createIdentifier = (payload: IIdentifierCreateRequest): Observable<IIdentifierDetailResponse> => {
    return this.httpClient.post<IIdentifierDetailResponse>(createIdentifierUrl(this.baseUrl()), payload);
  };

  editIdentifier = (identifierId: string, payload: IIdentifierEditRequest): Observable<IIdentifierDetailResponse> => {
    return this.httpClient.patch<IIdentifierDetailResponse>(editIdentifierUrl(this.baseUrl(), identifierId), payload);
  };

  deleteIdentifier = (identifierId: string): Observable<void> => {
    return this.httpClient.delete<void>(deleteIdentifierUrl(this.baseUrl(), identifierId));
  };
}
