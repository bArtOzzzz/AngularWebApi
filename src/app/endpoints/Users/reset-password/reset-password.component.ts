import { Component, Input, OnInit } from '@angular/core';
import { FridgeService } from 'src/app/services/fridge.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
  @Input() user: any;
  newPassword!: string;

  constructor(private fridgeService:FridgeService) { }

  ngOnInit(): void {
  }

  onSubmit() {
    this.resetPassword();
  }

  resetPassword() {
    this.fridgeService.resetPassword(this.user.id).subscribe(data => {
      this.newPassword = data;
    })
  }
}
