import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FridgeService } from 'src/app/services/fridge.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  isAuth!: boolean;

  constructor(private router:Router, private fridgeService:FridgeService) { }

  ngOnInit(): void {
    if(this.fridgeService.IsLoggedIn()) {
      this.isAuth = true;
    }
    else {
      this.isAuth = false;
    }
  }

  logout() {
    this.router.navigate(['/login']);
    localStorage.clear();
    setTimeout(function() {
      window.location.reload();
    }, 500)
  }

}
