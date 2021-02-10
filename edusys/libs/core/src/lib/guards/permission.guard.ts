import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class PermissionGuard implements CanActivate {
  token: string;
  constructor(private authService: AuthService, private router: Router) {}
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (!!this.authService.getAuthToken()) {
      const moduleName = route.data.moduleName;
      const redirectUrl = route.data.redirectUrl || '/';
      if (!moduleName) {
        throw new Error(`PermissionGuard - moduleName not defined for following URL: ${route.url}`);
      }
      const jwt = this.authService.getDecodedAuthToken();
      if (!jwt?.permissions?.includes(moduleName)) {
        this.router.navigate([redirectUrl]);
        return false;
      } else {
        return true;
      }
    } else {
      this.router.navigate(['login']);
      return false;
    }
  }
}
