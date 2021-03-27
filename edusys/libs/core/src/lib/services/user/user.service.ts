import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { APP_CONFIG } from '@edusys/app-config';
import { createUserUrl, deleteUserUrl, editUserUrl, fetchUserDetailUrl, fetchUserListUrl } from './user.endpoints';
import { IUserCreateRequest, IUserDetailResponse, IUserEditRequest } from '@edusys/model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private httpClient: HttpClient, @Inject(APP_CONFIG) private appConfig: any) {}

  baseUrl(): string {
    return this.appConfig.apiUrl;
  }

  fetchUserList = (): Observable<IUserDetailResponse[]> => {
    return this.httpClient.get<IUserDetailResponse[]>(fetchUserListUrl(this.baseUrl()));
  };

  fetchUserDetail = (userId: string): Observable<IUserDetailResponse> => {
    return this.httpClient.get<IUserDetailResponse>(fetchUserDetailUrl(this.baseUrl(), userId));
  };

  createUser = (payload: IUserCreateRequest): Observable<IUserDetailResponse> => {
    return this.httpClient.post<IUserDetailResponse>(createUserUrl(this.baseUrl()), payload);
  };

  editUser = (userId: string, payload: IUserEditRequest): Observable<IUserDetailResponse> => {
    return this.httpClient.patch<IUserDetailResponse>(editUserUrl(this.baseUrl(), userId), payload);
  };

  deleteUser = (userId: string): Observable<void> => {
    return this.httpClient.delete<void>(deleteUserUrl(this.baseUrl(), userId));
  };
}
