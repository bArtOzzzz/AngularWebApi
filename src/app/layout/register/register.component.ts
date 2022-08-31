import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Register } from 'src/app/models/Register';
import { FridgeService } from 'src/app/services/fridge.service';

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

   registerUser() {
    this.fridgeService.isExist(this.user.username).subscribe(data => {
      if(data == false) {
        this.fridgeService.registerUser(this.user).subscribe(data => {
          this.router.navigate(['/login']);
        })
      }
      else {
        alert("It seems like username { " + this.user.username + " } already taken!" );
      }
    })
  }
}
