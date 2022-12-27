import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Fridge } from 'src/app/models/fridge';
import { FridgeService } from 'src/app/services/fridge.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-fridge',
  templateUrl: './edit-fridge.component.html',
  styleUrls: ['./edit-fridge.component.scss']
})
export class EditFridgeComponent implements OnInit {

  constructor(private fridgeService:FridgeService) { }

  fridgeEntity = new Fridge();
  modelsList$!: Observable<any[]>;
  @Input() fridge:any;

  ngOnInit(): void {
    this.modelsList$ = this.fridgeService.getModels();
  }

  editFridge() {
    this.modelsList$.subscribe(data => {
      for(var i = 0; i < data.length; i++) {
        if(data[i].name == this.fridgeEntity.modelId) {
          this.fridgeEntity.modelId = data[i].id;
        }
      }
      this.fridgeService.updateFridge(this.fridge.id, this.fridgeEntity).subscribe(res => {
        var closeModalBtn = document.getElementById('edit-fridge-modal-close');
          if(closeModalBtn) {
            closeModalBtn.click();
            Swal.fire({
              position: 'top-end',
              icon: 'success',
              title: 'Your work has been saved',
              showConfirmButton: false,
              timer: 1500
            })
          }
          setTimeout(function() {
            window.location.reload();
          }, 1800)
      })
    })
  }
}
