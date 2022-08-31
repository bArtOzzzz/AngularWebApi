import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Login } from 'src/app/models/Login';
import { FridgeService } from 'src/app/services/fridge.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  responseData: any;
  login = new Login();

  constructor(private fridgeService: FridgeService, private router: Router) {}

  ngOnInit(): void {
  }

  loginUser() {
    this.fridgeService.loginUser(this.login).subscribe(result => {
      if(result) {
        this.router.navigate(['/home']);
      }
      else {
        console.log("failed");
      }
      setTimeout(function() {
        window.location.reload();
      }, 500)
    })
  }
}
