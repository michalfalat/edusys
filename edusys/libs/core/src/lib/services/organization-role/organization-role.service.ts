import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { APP_CONFIG } from '@edusys/app-config';
import {
  createOrganizationRoleUrl,
  deleteOrganizationRoleUrl,
  editOrganizationRoleUrl,
  fetchOrganizationRoleDetailUrl,
  fetchOrganizationRoleListUrl,
} from './organization-role.endpoints';
import { IOrganizationRoleCreateRequest, IOrganizationRoleDetailResponse, IOrganizationRoleEditRequest } from '@edusys/model';

@Injectable({
  providedIn: 'root',
})
export class OrganizationRoleService {
  constructor(private httpClient: HttpClient, @Inject(APP_CONFIG) private appConfig: any) {}

  baseUrl(): string {
    return this.appConfig.apiUrl;
  }

  fetchOrganizationRoleList = (): Observable<IOrganizationRoleDetailResponse[]> => {
    return this.httpClient.get<IOrganizationRoleDetailResponse[]>(fetchOrganizationRoleListUrl(this.baseUrl()));
  };

  fetchOrganizationRoleDetail = (organizationRoleId: string): Observable<IOrganizationRoleDetailResponse> => {
    return this.httpClient.get<IOrganizationRoleDetailResponse>(fetchOrganizationRoleDetailUrl(this.baseUrl(), organizationRoleId));
  };

  createOrganizationRole = (payload: IOrganizationRoleCreateRequest): Observable<IOrganizationRoleDetailResponse> => {
    return this.httpClient.post<IOrganizationRoleDetailResponse>(createOrganizationRoleUrl(this.baseUrl()), payload);
  };

  editOrganizationRole = (organizationRoleId: string, payload: IOrganizationRoleEditRequest): Observable<IOrganizationRoleDetailResponse> => {
    return this.httpClient.patch<IOrganizationRoleDetailResponse>(editOrganizationRoleUrl(this.baseUrl(), organizationRoleId), payload);
  };

  deleteOrganizationRole = (organizationRoleId: string): Observable<void> => {
    return this.httpClient.delete<void>(deleteOrganizationRoleUrl(this.baseUrl(), organizationRoleId));
  };
}
