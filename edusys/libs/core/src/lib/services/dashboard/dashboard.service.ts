import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { APP_CONFIG } from '@edusys/app-config';
import { IDashboardResponse } from '@edusys/model';
import { Observable } from 'rxjs';
import { dashboardUrl } from './dashboard.endpoints';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  constructor(private httpClient: HttpClient, @Inject(APP_CONFIG) private appConfig: any) {}

  baseUrl(): string {
    return this.appConfig.apiUrl;
  }

  dashboard = (): Observable<IDashboardResponse> => {
    return this.httpClient.get<IDashboardResponse>(dashboardUrl(this.baseUrl()));
  };
}
