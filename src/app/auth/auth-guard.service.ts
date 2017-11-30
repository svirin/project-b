import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Observable } from "rxjs/Observable";
import 'rxjs/add/observable/of'

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

    const promt = this.authService.getAuthState();
    if (promt != null)
      return this.authService.getAuthState().then(token => {
        if (token != null) {
          return true;
        }
        return false;
      }).catch(() => {
        return Observable.of(false);
      });

    return false;
  }
}
