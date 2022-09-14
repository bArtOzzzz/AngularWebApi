import { Component, OnInit } from '@angular/core';
import { FridgeService } from 'src/app/services/fridge.service';

@Component({
  selector: 'app-list-roles',
  templateUrl: './list-roles.component.html',
  styleUrls: ['./list-roles.component.scss']
})
export class ListRolesComponent implements OnInit {
  rolesList: any=[];
  startPage: number = 1;
  role: any=[];
  activateModalComponent: boolean = false;

  constructor(private fridgeService:FridgeService) { }

  ngOnInit(): void {
    this.getRoles();
  }

  Search() {
    if(this.rolesList.role == '') {
      this.ngOnInit();
    }
    else {
      this.rolesList = this.rolesList.filter((res: { role: string; }) => {
        return res.role.toLocaleLowerCase().match(this.rolesList.role.toLocaleLowerCase());
      })
    }
  }

  // Response to "modalCreateOpen" event
  modalEditOpen(role:any) {
    this.role = role;
    this.activateModalComponent = true;
  }

  // Response to "modalCreateClose" event
  modalClose() {
    this.activateModalComponent = false;
  }

  getRoles() {
    this.fridgeService.getRoles().subscribe(data => {
      this.rolesList = data;
    })
  }

  deleteRole(roleId: string) {
    if(confirm(`Are you sure you want to delete this role?`)) {
      this.fridgeService.deleteRole(roleId).subscribe(res => {
        setTimeout(function() {
          window.location.reload();
        }, 500)
      })
    }
  }
}
