import { Component, OnInit } from '@angular/core';
import { FridgeService } from 'src/app/services/fridge.service';
import Swal from 'sweetalert2';

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
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        )
        this.fridgeService.deleteRole(roleId).subscribe(res => {
          setTimeout(function() {
            window.location.reload();
          }, 1800)
        })
      }
    })
  }
}
