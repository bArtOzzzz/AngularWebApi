import { Component, OnInit } from '@angular/core';
import { Model } from 'src/app/models/Model';
import { FridgeService } from 'src/app/services/fridge.service';
import Swal from 'sweetalert2';

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
    this.fridgeService.getAllFridges().subscribe(data => {
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
        this.fridgeService.deleteModel(modelId).subscribe(res => {
          setTimeout(function() {
            window.location.reload();
          }, 1800)
        })
      }
    })
  }
}
