import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { BehaviorSubject, catchError, Observable, Subject, switchMap, throwError } from 'rxjs';
import { Token } from '../models/Token';
import { JwtHelperService } from '@auth0/angular-jwt';
import { FridgeService } from '../services/fridge.service';
import { User } from '../models/User';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private jwtHelper:JwtHelperService, private fridgeService:FridgeService) { }
  
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // if(request.url.indexOf("login") > -1 || request.url.indexOf("refreshToken") > -1 || request.urlWithParams.indexOf("register")) {
    //   console.log("Login")
    // }

    const localStorageToken = localStorage.getItem('tokens');
    var token:Token;

    if(localStorageToken) {
      token = JSON.parse(localStorageToken) as Token;

      var isTokenExpired = this.jwtHelper.isTokenExpired(token.accessToken);

      if(!isTokenExpired){
        let jwttoken = request.clone({
          headers: request.headers.set(
            'Authorization',
            `bearer ${token.accessToken}`
          )
        });
        return next.handle(jwttoken);
      }
      else {
        console.log("Token expired!");
        
        return this.fridgeService.refreshToken(token).pipe(
          switchMap((newTokens:Token) => {
            localStorage.setItem('tokens', JSON.stringify(newTokens));
            var userInfo = this.jwtHelper.decodeToken(newTokens.accessToken) as User;
            this.fridgeService.profile.next(userInfo);
            const transformReq = request.clone({
              headers: request.headers.set(
                'Authorization',
                `bearer ${newTokens.accessToken}`
              )
            });
            return next.handle(transformReq);
          }),
          catchError((error) => {
            this.fridgeService.Logout();
            this.fridgeService.profile.next(null);
            return throwError(() => 'Invalid Call \n {Info: Exception in interceptor while expired token} \n' + error)
          })
        )
      }
    }
    return next.handle(request);
  }
}
