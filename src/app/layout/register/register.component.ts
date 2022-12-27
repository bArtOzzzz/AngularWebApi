import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Register } from 'src/app/models/Register';
import { FridgeService } from 'src/app/services/fridge.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  constructor(private fridgeService: FridgeService, private router: Router) { }

  repeatPassword!: string;
  user = new Register();

  ngOnInit(): void {
  }

  navigateToLogin() {
    this.router.navigate(['/login']);
  }

   registerUser() {
    this.fridgeService.isExist(this.user.username).subscribe(data => {
      if(data == false) {
        this.fridgeService.registerUser(this.user).subscribe(data => {
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Your work has been saved',
            showConfirmButton: false,
            timer: 1500
          })

          setTimeout(this.navigateToLogin.bind(this),1800);
        })
      }
      else {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: "It seems like username <<" + this.user.username + ">> already taken!",
          footer: '<a href="">Why do I have this issue?</a>'
        })
      }
    })
  }
}
