import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';

import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { LOGIN } from '../routes.const';
import { NavigationService } from './navigation.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceGuard implements CanActivate {

  constructor(private authService: AuthService,private navigationService: NavigationService,) {
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      console.log(this.authService.getToken().length>0);
      if((this.authService.getToken().length<=0)){
          this.navigationService.routeToPath(LOGIN);
      }
    return true;
  }

}
