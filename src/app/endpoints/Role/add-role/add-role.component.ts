import { Component, OnInit } from '@angular/core';
import { Role } from 'src/app/models/role';
import { FridgeService } from 'src/app/services/fridge.service';

@Component({
  selector: 'app-add-role',
  templateUrl: './add-role.component.html',
  styleUrls: ['./add-role.component.scss']
})
export class AddRoleComponent implements OnInit {
  role = new Role();

  constructor(private fridgeService:FridgeService) { }

  ngOnInit(): void {
  }

  onSubmit() {
    this.createRole();
  }

  createRole() {
    this.fridgeService.createRole(this.role).subscribe(data => {
      var closeModalBtn = document.getElementById('create-role-modal-close');
        if(closeModalBtn) {
          closeModalBtn.click();
        }
        setTimeout(function() {
          window.location.reload();
        }, 500)
    })
  }
}
