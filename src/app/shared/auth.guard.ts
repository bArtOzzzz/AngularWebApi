import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Token } from '../models/Token';
import { User } from '../models/User';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  jwtHelper = new JwtHelperService;
  constructor(private router:Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const currentUser = localStorage.getItem('tokens');
    var token = JSON.parse(currentUser!) as Token;
    var userData = this.jwtHelper.decodeToken(token.accessToken) as User;

    if (token.accessToken) {
      if (route.data['roles'] && route.data['roles'].indexOf(userData['http://schemas.microsoft.com/ws/2008/06/identity/claims/role']) === -1) {
          alert(" Ooops... It seems like you do not have premission for this action!");
          this.router.navigate(['/']);
          return false;
      }
      return true;
  }
    this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
    return false;
  }
}
