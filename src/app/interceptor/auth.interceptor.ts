import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { catchError, Observable, switchMap, throwError } from 'rxjs';
import { Token } from '../models/Token';
import { JwtHelperService } from '@auth0/angular-jwt';
import { FridgeService } from '../services/fridge.service';
import { User } from '../models/User';
import { environment } from 'src/environments/environment.prod'

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private jwtHelper:JwtHelperService, private fridgeService:FridgeService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if(request.url.includes(environment.authenticationApiUrl + 'v1/login') || 
       request.url.includes(environment.authenticationApiUrl + "v1/refreshToken") ||
       request.url.includes(environment.authenticationApiUrl + 'v1/register')) {
      console.log("Login, refreshToken or register request!");
      return next.handle(request);
    }
    
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
        console.log("Others requests: token not expired!");
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
            return throwError(() => 'Invalid Call \n {Info: Exception in interceptor} \n' + error)
          })
        )
      }
    }
    return throwError(() => 'Invalid Call {Info: Exception in interceptor}');
  }
}
