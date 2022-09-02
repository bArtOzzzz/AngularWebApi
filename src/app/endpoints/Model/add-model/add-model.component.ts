import { Component, OnInit } from '@angular/core';
import { Model } from 'src/app/models/Model';
import { FridgeService } from 'src/app/services/fridge.service';

@Component({
  selector: 'app-add-model',
  templateUrl: './add-model.component.html',
  styleUrls: ['./add-model.component.scss']
})
export class AddModelComponent implements OnInit {
  modelEntity = new Model();

  constructor(private fridgeService: FridgeService) { }

  ngOnInit(): void {
  }

  onSubmit() {
    this.createModel();
  }

  createModel() {
    this.fridgeService.createModel(this.modelEntity).subscribe(data => {
      var closeModalBtn = document.getElementById('create-model-modal-close');
        if(closeModalBtn) {
          closeModalBtn.click();
        }
        setTimeout(function() {
          window.location.reload();
        }, 500)
    })
  }
}
