import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BehaviorSubject, catchError, map, Observable, of } from 'rxjs';
import { Fridge } from '../models/fridge';
import { Token } from '../models/Token';
import { User } from '../models/User';

@Injectable({
  providedIn: 'root'
})
export class FridgeService {
  baseUrl: string = 'http://localhost:5000/api/';
  localhost: string = "http://localhost:4200/";
  constructor(private http: HttpClient, private router:Router) { }
  jwtHelper = new JwtHelperService;
  profile = new BehaviorSubject<User | null>(null);
  userData: any;

  //___________________________________________________Fridge___________________________________________________
  getFridges(userId: string):Observable<any[]> {
    return this.http.get<any>(this.baseUrl + 'fridges/' + userId);
  } 

  getAllFridges():Observable<any[]> {
    console.log(this.baseUrl + 'fridges');
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

  getUserData() {
    const currentUser = localStorage.getItem('tokens');
    var token = JSON.parse(currentUser!) as Token;
    this.userData = this.jwtHelper.decodeToken(token.accessToken) as User;
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

  //___________________________________________________User_____________________________________________________
  getUsers():Observable<any[]> {
    return this.http.get<any>(this.baseUrl + 'users');
  }

  getUser(userId: string):Observable<any> {
    return this.http.get<any>(this.baseUrl + 'users/' + userId);
  }

  updateUser(userId: string, data: any) {
    return this.http.put(this.baseUrl + 'users/' + userId, data, {responseType: "text"});
  }

  updateUserName(userId: string, data: any) {
    return this.http.put(this.baseUrl + 'users/name/' + userId, data, {responseType: "text"});
  }

  updateUserEmail(userId: string, data: any) {
    return this.http.put(this.baseUrl + 'users/email/' + userId, data, {responseType: "text"});
  }

  updateUserPassword(userId: string, data: any) {
    return this.http.put(this.baseUrl + 'users/password/' + userId, data, {responseType: "text"});
  }

  resetPassword(userId: string) {
    return this.http.put(this.baseUrl + 'users/reset/' + userId, null, {responseType: "text"});
  }

  deleteUser(userId: string):Observable<any> {
    return this.http.delete(this.baseUrl + 'users/' + userId, {responseType: "text"});
  }

   //___________________________________________________Role_____________________________________________________
  getRoles():Observable<any[]> {
    return this.http.get<any>(this.baseUrl + 'roles/');
  }
  
  getRole(roleId: string):Observable<any> {
    return this.http.get<any>(this.baseUrl + 'roles/' + roleId);
  }

  createRole(data: any) {
    return this.http.post(this.baseUrl + 'roles/', data, {responseType: "text"});
  }

  updateRole(roleId: string, data: any) {
    return this.http.put(this.baseUrl + 'roles/' + roleId, data, {responseType: "text"});
  }

  updateRoleByUser(userId: string, data: any) {
    return this.http.put(this.baseUrl + 'roles/updateUserRole/' + userId, data, {responseType: "text"});
  }

  deleteRole(roleId: string) {
    return this.http.delete(this.baseUrl + 'roles/' + roleId, {responseType: "text"});
  }
}
