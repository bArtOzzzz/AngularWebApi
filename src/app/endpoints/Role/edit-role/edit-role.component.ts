import { Component, Input, OnInit } from '@angular/core';
import { Role } from 'src/app/models/role';
import { FridgeService } from 'src/app/services/fridge.service';

@Component({
  selector: 'app-edit-role',
  templateUrl: './edit-role.component.html',
  styleUrls: ['./edit-role.component.scss']
})
export class EditRoleComponent implements OnInit {
  roleEntity = new Role();
  @Input() role: any;
  
  constructor(private fridgeService:FridgeService) { }

  ngOnInit(): void {
  }

  onSubmit() {
    this.updateRole();
  }

  updateRole() {
    this.fridgeService.updateRole(this.role.id, this.roleEntity).subscribe(data => {
      var closeModalBtn = document.getElementById('edit-role-modal-close');
      if(closeModalBtn) {
        closeModalBtn.click();
      }
      setTimeout(function() {
        window.location.reload();
      }, 500)
    })
  }
}
