import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BehaviorSubject, catchError, map, Observable, of, throwError } from 'rxjs';
import { Fridge } from '../models/fridge';
import { Token } from '../models/Token';
import { User } from '../models/User';


@Injectable({
  providedIn: 'root'
})
export class FridgeService {
  baseUrl: string = 'https://localhost:7199/api/';
  constructor(private http: HttpClient, private router:Router) { }
  jwtHelper = new JwtHelperService;
  profile = new BehaviorSubject<User | null>(null);

  //___________________________________________________Fridge___________________________________________________
  getFridges():Observable<any[]> {
    return this.http.get<any>(this.baseUrl + 'fridges');
  } 

  updateFridge(fridgeId: string, data: any) {
    return this.http.put(this.baseUrl + 'fridges/' + fridgeId, data, {responseType: "text"});
  }

  createFridge(data: Fridge) {
    return this.http.post(this.baseUrl + 'fridges', data, {responseType: "text"});
  }

  deleteFridge(fridgeId: string):Observable<any> {
    return this.http.delete(this.baseUrl + 'fridges/' + fridgeId, {responseType: "text"});
  }

  //___________________________________________________Model____________________________________________________
  getModels():Observable<any[]> {
    return this.http.get<any>(this.baseUrl + 'models');
  }

  updateModel(modelId: string, data: any) {
    return this.http.put(this.baseUrl + 'models/' + modelId, data, {responseType: "text"});
  }

  createModel(data: any) {
    return this.http.post(this.baseUrl + 'models', data, {responseType: "text"});
  }

  deleteModel(modelId: string) {
    return this.http.delete(this.baseUrl + 'models/' + modelId, {responseType: "text"});
  }

  //___________________________________________________Product__________________________________________________
  getProducts():Observable<any[]> {
    return this.http.get<any>(this.baseUrl + 'products');
  }

  updateProduct(productId: string, data: any) {
    return this.http.put(this.baseUrl + 'products/' + productId, data, {responseType: "text"});
  }

  createProduct(data: any) {
    return this.http.post(this.baseUrl + 'products', data, {responseType: "text"});
  }

  deleteProduct(productId: string):Observable<any> {
    return this.http.delete(this.baseUrl + 'products/' + productId, {responseType: "text"});
  }

  //___________________________________________________FridgeProducts___________________________________________
  getFridgeProducts():Observable<any> {
    return this.http.get<any>(this.baseUrl + 'fridgeProducts');
  }

  getProductsByFridgeId(fridgeId: string):Observable<any[]> {
    return this.http.get<any>(this.baseUrl + 'fridgeProducts/' + fridgeId + '/products');
  }

  getFridgeProductByProductId(productId: string): Observable<any> {
    return this.http.get<any>(this.baseUrl + 'fridgeProducts/' + productId + '/fridgeProduct');
  }

  updateFridgeProduct(fridgeProductId: string, data: any) {
    return this.http.put(this.baseUrl + 'fridgeProducts/' + fridgeProductId, data, {responseType: "text"});
  }

  createFridgeProduct(fridgeId: string, data: any):Observable<any> {
    return this.http.post(this.baseUrl + 'fridgeProducts/' + fridgeId, data, {responseType: "text"});
  }

  deleteFridgeProduct(fridgeProductId: string):Observable<any> {
    return this.http.delete(this.baseUrl + 'fridgeProducts/' + fridgeProductId, {responseType: "text"});
  }

  //___________________________________________________Registration_____________________________________________
  registerUser(data: any) {
    return this.http.post(this.baseUrl + 'register/', data, {responseType: "text"});
  }

  //___________________________________________________Login____________________________________________________
  loginUser(loginData: any) {
    return this.http.post(this.baseUrl + 'login', loginData).pipe(map((data) => {
      var tokens = data as Token;
      localStorage.setItem("tokens", JSON.stringify(tokens));
      var userData = this.jwtHelper.decodeToken(tokens.accessToken) as User;
      this.profile.next(userData);
      return true;
    }),
    catchError((error => {
      console.log(error);
      return of(false);
    })));
  }

  IsLoggedIn() {
    var localStorageToken = localStorage.getItem('tokens');
    if(localStorageToken == null) {
      return false;
    }
    var token = JSON.parse(localStorageToken) as Token;
    if(token.accessToken) {
      return true;
    }
    return false;
  }

  getAccessToken() {
    var localStorageToken = localStorage.getItem("tokens");
    if(localStorageToken) {
      var token = JSON.parse(localStorageToken) as Token;
      var userInfo = this.jwtHelper.decodeToken(token.accessToken) as User;
      this.profile.next(userInfo);
      return token.accessToken;
    }
    return "";
  }

  refreshToken(tokens: Token) {
    return this.http.post<Token>(this.baseUrl + '/refreshToken', tokens);
  }

  Logout() {
    alert('Your session expired');
    localStorage.removeItem('tokens');
    this.router.navigate(['/login']);
    window.location.reload();
  }

  isExist(username: string) {
    return this.http.get<boolean>(this.baseUrl + 'exist/' + username);
  }
}
