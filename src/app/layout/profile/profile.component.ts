import { Component, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { FridgeService } from 'src/app/services/fridge.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  userData = {
    username: "",
    emailAddress: "",
    password: ""
  }

  repeatPassword!: string;

  userId!: string;
  userRole!: string;
  currentUser: any=[];

  constructor(private fridgeService:FridgeService, private router:Router) { }

  ngOnInit(): void {
    this.getUserId();
    this.getUser();
  }

  getUserId() {
    var localStorageToken = localStorage.getItem('tokens');
    var token = JSON.parse(localStorageToken!);
    const helper = new JwtHelperService();
    const decodedToken = helper.decodeToken(token.accessToken);
    this.userRole = decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
    this.userId = decodedToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'];
  }

  getUser() {
    this.fridgeService.getUser(this.userId).subscribe(data => {
      this.currentUser = data;
    })
  }

  editUsername() {
    this.fridgeService.updateUserName(this.userId, this.userData).subscribe(data => {
      var closeModalBtn = document.getElementById('edit-user-modal-close');
      if(closeModalBtn) {
        closeModalBtn.click();
      }
      setTimeout(function() {
        window.location.reload();
      }, 500)
    })
  }

  editEmailAddress() {
    this.fridgeService.updateUserEmail(this.userId, this.userData).subscribe(data => {
      var closeModalBtn = document.getElementById('edit-user-modal-close');
      if(closeModalBtn) {
        closeModalBtn.click();
      }
      setTimeout(function() {
        window.location.reload();
      }, 500)
    })
  }

  editPassword() {
    this.fridgeService.updateUserPassword(this.userId, this.userData).subscribe(data => {
      var closeModalBtn = document.getElementById('edit-user-modal-close');
      if(closeModalBtn) {
        closeModalBtn.click();
      }
      setTimeout(function() {
        window.location.reload();
      }, 500)
    })
  }

  editUserProfile() {
    this.fridgeService.updateUser(this.userId, this.userData).subscribe(data => {
      var closeModalBtn = document.getElementById('edit-user-modal-close');
      if(closeModalBtn) {
        closeModalBtn.click();
      }
      setTimeout(function() {
        window.location.reload();
      }, 500)
    })
  }

  modalClose() {
    this.userData = {
      username: "",
      emailAddress: "",
      password: ""
    }

    this.repeatPassword = "";
  }

  deleteUserProfile() {
    if(confirm(`Are you sure you want to delete this profile?\n This action permanently delete your account!`)) {
      this.router.navigate(['/login']);
      this.fridgeService.deleteUser(this.userId).subscribe(res => {
        setTimeout(function() {
          window.location.reload();
        }, 500)
      })
    }
  }
}
