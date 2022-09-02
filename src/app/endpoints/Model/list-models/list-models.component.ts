import { Component, OnInit } from '@angular/core';
import { Model } from 'src/app/models/Model';
import { FridgeService } from 'src/app/services/fridge.service';

@Component({
  selector: 'app-list-models',
  templateUrl: './list-models.component.html',
  styleUrls: ['./list-models.component.scss']
})
export class ListModelsComponent implements OnInit {
  modelEntity = new Model();
  modelList: any=[];
  fridgeList: any=[];
  startPage: number = 1;
  modelId!: string;

  constructor(private fridgeService:FridgeService) { }

  ngOnInit(): void {
    this.getModels();
    this.getFridges();
  }

  Search() {
    if(this.modelList.name == '') {
      this.ngOnInit();
    }
    else {
      this.modelList = this.modelList.filter((res: { name: string; }) => {
        return res.name.toLocaleLowerCase().match(this.modelList.name.toLocaleLowerCase());
      })
    }
  }

  getCurrentModel(modelId: string) {
    this.modelId = modelId;
  }

  getFridges() {
    this.fridgeService.getFridges().subscribe(data => {
      this.fridgeList = data;
    })
  }

  getModels() {
    this.fridgeService.getModels().subscribe(data => {
      this.modelList = data;
    });
  }

  deleteModel(modelId: string) {
    for(let i = 0; i < this.fridgeList.length; i++) {
      if(this.fridgeList[i].modelId == modelId) {
        console.log("You can't delete this model");
        alert("Oops! It seems you can't delete this model!");
        return;
      }
    }
    if(confirm(`Are you sure you want to delete this model?`)) {
      this.fridgeService.deleteModel(modelId).subscribe(res => {
        setTimeout(function() {
          window.location.reload();
        }, 500)
      })
    }
  }
}
