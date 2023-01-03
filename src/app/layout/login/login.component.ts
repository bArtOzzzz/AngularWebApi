import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Login } from 'src/app/models/Login';
import { FridgeService } from 'src/app/services/fridge.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  responseData: any;
  login = new Login();

  constructor(private fridgeService: FridgeService, private router: Router) {}

  ngOnInit(): void {}

  navigateToHome() {
    this.router.navigate(['/home']);
    setTimeout(function() {
          window.location.reload();
        }, 500)
  }

  loginUser() {
    this.fridgeService.loginUser(this.login).subscribe(result => {
      if(result) {
        Swal.fire(
          'Signed in',
          '',
          'success'
        );
        setTimeout(this.navigateToHome.bind(this), 1800);
      }
      else {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'User not found! Check your password or login.'
        })
      }
    })
  }
}


