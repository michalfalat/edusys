import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { APP_CONFIG } from '@edusys/app-config';
import { createPackageUrl, deletePackageUrl, editPackageUrl, fetchPackageDetailUrl, fetchPackageListUrl } from './package.endpoints';
import { IPackageCreateRequest, IPackageDetailResponse, IPackageEditRequest } from '@edusys/model';

@Injectable({
  providedIn: 'root',
})
export class PackageService {
  constructor(private httpClient: HttpClient, @Inject(APP_CONFIG) private appConfig: any) {}

  baseUrl(): string {
    return this.appConfig.apiUrl;
  }

  fetchPackageList = (): Observable<IPackageDetailResponse[]> => {
    return this.httpClient.get<IPackageDetailResponse[]>(fetchPackageListUrl(this.baseUrl()));
  };

  fetchPackageDetail = (packageId: string): Observable<IPackageDetailResponse> => {
    return this.httpClient.get<IPackageDetailResponse>(fetchPackageDetailUrl(this.baseUrl(), packageId));
  };

  createPackage = (payload: IPackageCreateRequest): Observable<IPackageDetailResponse> => {
    return this.httpClient.post<IPackageDetailResponse>(createPackageUrl(this.baseUrl()), payload);
  };

  editPackage = (packageId: string, payload: IPackageEditRequest): Observable<IPackageDetailResponse> => {
    return this.httpClient.patch<IPackageDetailResponse>(editPackageUrl(this.baseUrl(), packageId), payload);
  };

  deletePackage = (packageId: string): Observable<void> => {
    return this.httpClient.delete<void>(deletePackageUrl(this.baseUrl(), packageId));
  };
}
