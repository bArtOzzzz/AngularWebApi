import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { FridgeService } from '../services/fridge.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  
  constructor(private fridgeService:FridgeService, private router:Router) {}

  canActivate() {
    if(this.fridgeService.IsLoggedIn()) {
      return true;
    }
    else {
      alert(" Ooops... It seems like you do not have premission for this action!");
      this.router.navigate(["/login"])
      return false;
    }
  }
}
