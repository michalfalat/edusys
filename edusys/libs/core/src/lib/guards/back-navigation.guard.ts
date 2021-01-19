import { Location } from '@angular/common';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanDeactivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface CanComponentDeactivate {
  canDeactivate: () => Observable<boolean>;
}

@Injectable({
  providedIn: 'root',
})
export class BackNavigationGuard implements CanDeactivate<CanComponentDeactivate> {
  constructor(private location: Location, private router: Router) {}

  canDeactivate(
    component: CanComponentDeactivate,
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
    nextState?: RouterStateSnapshot,
  ): any {
    if (component.canDeactivate) {
      return component.canDeactivate().pipe(
        map(result => {
          if (result === false) {
            const currentUrlTree = this.router.createUrlTree([], route);
            const currentUrl = currentUrlTree.toString();
            this.location.go(currentUrl);
          }
          return result;
        }),
      );
    }
    return true;
  }
}
