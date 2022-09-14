import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { FridgeService } from 'src/app/services/fridge.service';

@Component({
  selector: 'app-change-role',
  templateUrl: './change-role.component.html',
  styleUrls: ['./change-role.component.scss']
})
export class ChangeRoleComponent implements OnInit {
  rolesList$!: Observable<any[]>;
  roleData = {
    role: ""
  }
  @Input() user: any;

  constructor(private fridgeServicve:FridgeService) { }

  ngOnInit(): void {
    this.rolesList$ = this.fridgeServicve.getRoles();
  }

  onSubmit() {
    this.changeRole();
  }

  changeRole() {
    var newRole = {
      role: this.roleData.role
    }

    this.fridgeServicve.updateRoleByUser(this.user.id, newRole).subscribe(data => {
      var closeModalBtn = document.getElementById('change-role-modal-close');
      if(closeModalBtn) {
        closeModalBtn.click();
      }
      setTimeout(function() {
        window.location.reload();
      }, 500)
    })
  }
}