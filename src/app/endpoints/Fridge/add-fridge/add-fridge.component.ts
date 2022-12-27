import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Fridge } from 'src/app/models/fridge';
import { Model } from 'src/app/models/Model';
import { FridgeService } from 'src/app/services/fridge.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-fridge',
  templateUrl: './add-fridge.component.html',
  styleUrls: ['./add-fridge.component.scss']
})
export class AddFridgeComponent implements OnInit {
  fridgeEntity = new Fridge();
  modelEntity = new Model();
  modelsList$!: Observable<any[]>;
  productList$!: Observable<any[]>;
  isModelChecked = false;

  constructor(private fridgeService: FridgeService) { }
  
  ngOnInit(): void {
    this.modelsList$ = this.fridgeService.getModels();
  }

  onSubmit() {
    if(!this.isModelChecked) {
      this.createFridge();
    }
    else {
      this.createFridgeWithModel();
    }
  }

  createFridge() {
    this.modelsList$.subscribe(data => {
      if(!this.isModelChecked) {
        for(var i = 0; i < data.length; i++) {
          if(data[i].name == this.fridgeEntity.modelId) {
            this.fridgeEntity.modelId = data[i].id;
          }
        }
      }
      this.fridgeService.createFridge(this.fridgeEntity).subscribe(data => {
        var closeModalBtn = document.getElementById('create-fridge-modal-close');
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

  createFridgeWithModel() {
    this.fridgeService.createModel(this.modelEntity).subscribe(data => {
      var modelId = JSON.parse(data);
      this.fridgeEntity.modelId = modelId;
      this.createFridge();
    })
  }

  isActiveModelCheckbox() {
    if(this.isModelChecked) {
      this.isModelChecked = false;
    }
    else {
      this.isModelChecked = true;
    }
  }
}
