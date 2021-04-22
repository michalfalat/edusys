import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { APP_CONFIG } from '@edusys/app-config';
import {
  ISubscriptionDetailResponse,
  ISubscriptionFilterRequest,
  ISubscriptionEditRequest,
  Pagination,
  ISubscriptionCreateRequest,
  ISubscriptionResponse,
} from '@edusys/model';
import { Observable } from 'rxjs';
import {
  deleteSubscriptionUrl,
  editSubscriptionUrl,
  fetchSubscriptionDetailUrl,
  fetchSubscriptionListUrl,
  createSubscriptionUrl,
} from './subscription.endpoints';

@Injectable({
  providedIn: 'root',
})
export class SubscriptionService {
  constructor(private httpClient: HttpClient, @Inject(APP_CONFIG) private appConfig: any) {}

  baseUrl(): string {
    return this.appConfig.apiUrl;
  }

  fetchSubscriptionList = (request: ISubscriptionFilterRequest): Observable<Pagination<ISubscriptionResponse>> => {
    return this.httpClient.post<Pagination<ISubscriptionResponse>>(fetchSubscriptionListUrl(this.baseUrl()), request);
  };

  fetchSubscriptionDetail = (subscriptionId: string): Observable<ISubscriptionDetailResponse> => {
    return this.httpClient.get<ISubscriptionDetailResponse>(fetchSubscriptionDetailUrl(this.baseUrl(), subscriptionId));
  };

  createSubscription = (payload: ISubscriptionCreateRequest): Observable<ISubscriptionDetailResponse> => {
    return this.httpClient.post<ISubscriptionDetailResponse>(createSubscriptionUrl(this.baseUrl()), payload);
  };

  editSubscription = (subscriptionId: string, payload: ISubscriptionEditRequest): Observable<ISubscriptionDetailResponse> => {
    return this.httpClient.patch<ISubscriptionDetailResponse>(editSubscriptionUrl(this.baseUrl(), subscriptionId), payload);
  };

  deleteSubscription = (subscriptionId: string): Observable<void> => {
    return this.httpClient.delete<void>(deleteSubscriptionUrl(this.baseUrl(), subscriptionId));
  };
}
