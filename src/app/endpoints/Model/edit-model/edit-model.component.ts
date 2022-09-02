import { Component, Input, OnInit } from '@angular/core';
import { Model } from 'src/app/models/Model';
import { FridgeService } from 'src/app/services/fridge.service';

@Component({
  selector: 'app-edit-model',
  templateUrl: './edit-model.component.html',
  styleUrls: ['./edit-model.component.scss']
})
export class EditModelComponent implements OnInit {
  modelEntity = new Model();
  @Input() modelId!: string;

  constructor(private fridgeService: FridgeService) { }

  ngOnInit(): void {
  }

  onSubmit() {
    this.editModel();
  }

  editModel() {
    this.fridgeService.updateModel(this.modelId, this.modelEntity).subscribe(data => {
      var closeModalBtn = document.getElementById('edit-model-modal-close');
        if(closeModalBtn) {
          closeModalBtn.click();
        }
        setTimeout(function() {
          window.location.reload();
        }, 500)
    })
  }
}
