import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { APP_CONFIG } from '@edusys/app-config';
import {
  createOrganizationUrl,
  deleteOrganizationUrl,
  editOrganizationUrl,
  fetchOrganizationDetailUrl,
  fetchOrganizationListUrl,
  fetchCompanyInfoDetailUrl,
  editCompanyInfoDetailUrl,
} from './organization.endpoints';
import {
  ICompanyInfoDetailResponse,
  ICompanyInfoEditRequest,
  IOrganizationCreateRequest,
  IOrganizationDetailResponse,
  IOrganizationEditRequest,
} from '@edusys/model';

@Injectable({
  providedIn: 'root',
})
export class OrganizationService {
  constructor(private httpClient: HttpClient, @Inject(APP_CONFIG) private appConfig: any) {}

  baseUrl(): string {
    return this.appConfig.apiUrl;
  }

  fetchOrganizationList = (): Observable<IOrganizationDetailResponse[]> => {
    return this.httpClient.get<IOrganizationDetailResponse[]>(fetchOrganizationListUrl(this.baseUrl()));
  };

  fetchOrganizationDetail = (organizationId: string): Observable<IOrganizationDetailResponse> => {
    return this.httpClient.get<IOrganizationDetailResponse>(fetchOrganizationDetailUrl(this.baseUrl(), organizationId));
  };

  createOrganization = (payload: IOrganizationCreateRequest): Observable<IOrganizationDetailResponse> => {
    return this.httpClient.post<IOrganizationDetailResponse>(createOrganizationUrl(this.baseUrl()), payload);
  };

  editOrganization = (organizationId: string, payload: IOrganizationEditRequest): Observable<IOrganizationDetailResponse> => {
    return this.httpClient.patch<IOrganizationDetailResponse>(editOrganizationUrl(this.baseUrl(), organizationId), payload);
  };

  deleteOrganization = (organizationId: string): Observable<void> => {
    return this.httpClient.delete<void>(deleteOrganizationUrl(this.baseUrl(), organizationId));
  };

  fetchCompanyInfoDetail = (): Observable<ICompanyInfoDetailResponse> => {
    return this.httpClient.get<ICompanyInfoDetailResponse>(fetchCompanyInfoDetailUrl(this.baseUrl()));
  };

  editCompanyInfoDetail = (payload: ICompanyInfoEditRequest): Observable<ICompanyInfoDetailResponse> => {
    return this.httpClient.patch<ICompanyInfoDetailResponse>(editCompanyInfoDetailUrl(this.baseUrl()), payload);
  };
}
