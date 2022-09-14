import { Component, OnInit } from '@angular/core';
import { FridgeService } from 'src/app/services/fridge.service';

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.scss']
})
export class ListUsersComponent implements OnInit {
  usersList: any=[];
  startPage: number = 1;
  activateModalComponent: boolean = false;
  user: any;

  constructor(private fridgeService:FridgeService) { }

  ngOnInit(): void {
    this.getUsers();
  }

  Search() {
    if(this.usersList.username == '') {
      this.ngOnInit();
    }
    else {
      this.usersList = this.usersList.filter((res: { username: string; }) => {
        return res.username.toLocaleLowerCase().match(this.usersList.username.toLocaleLowerCase());
      })
    }
  }

  getUsers() {
    this.fridgeService.getUsers().subscribe(data => {
      this.usersList = data;
      for (let i = 0; i < data.length; i++) {
        this.fridgeService.getRole(data[i].roleId).subscribe(data => {
          this.usersList[i].role = data.role;
        })
      }
    })
  }
  
  modalEditOpen(data: any) {
    this.user = data;
    this.activateModalComponent = true;
  }

  modalClose() {
    this.activateModalComponent = false;
  }

  deleteUser(userId: string) {
    if(confirm(`Are you sure you want to delete this user?`)) {
      this.fridgeService.deleteUser(userId).subscribe(res => {
        setTimeout(function() {
          window.location.reload();
        }, 500)
      })
    }
  }
}
