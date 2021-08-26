import { Injectable } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { AppDeviceScreen } from '../../model/app/app.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class LayoutService {
  constructor(private breakPointObserver: BreakpointObserver) {}

  deviceScreen(): Observable<AppDeviceScreen> {
    return this.breakPointObserver
      .observe([
        Breakpoints.XSmall,
        Breakpoints.Small,
        Breakpoints.Medium,
        Breakpoints.Large,
        Breakpoints.XLarge,
        Breakpoints.Handset,
        Breakpoints.Tablet,
        Breakpoints.Web,
      ])
      .pipe(
        map((data) => {
          let deviceSize: AppDeviceScreen;
          if (data.breakpoints[Breakpoints.Handset] || data.breakpoints[Breakpoints.XSmall] || data.breakpoints[Breakpoints.Small]) {
            deviceSize = AppDeviceScreen.MOBILE;
          } else if (data.breakpoints[Breakpoints.Tablet] || data.breakpoints[Breakpoints.Medium]) {
            deviceSize = AppDeviceScreen.TABLET;
          } else if (data.breakpoints[Breakpoints.Web] || data.breakpoints[Breakpoints.Large] || data.breakpoints[Breakpoints.XLarge]) {
            deviceSize = AppDeviceScreen.WEB;
          }
          return deviceSize;
        }),
      );
  }
}
