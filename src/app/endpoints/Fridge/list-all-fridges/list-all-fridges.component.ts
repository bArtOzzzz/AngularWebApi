import { Component, OnInit } from '@angular/core';
import { FridgeService } from 'src/app/services/fridge.service';

@Component({
  selector: 'app-list-all-fridges',
  templateUrl: './list-all-fridges.component.html',
  styleUrls: ['./list-all-fridges.component.scss']
})
export class ListAllFridgesComponent implements OnInit {
  fridgesList: any=[];
  activateModalComponent: boolean = false;
  startPage: number = 1;
  fridge: any;

  constructor(private fridgeService:FridgeService) { }

  ngOnInit(): void {
    this.getFridges();
  }

  // Implements endpoint of getting fridges
  getFridges() {
    this.fridgeService.getAllFridges().subscribe(data => {
      this.fridgesList = data;
    });
  }

  // Implementation for search button function
  Search() {
    if(this.fridgesList.manufacturer == '') {
      this.ngOnInit();
    }
    else {
      this.fridgesList = this.fridgesList.filter((res: { manufacturer: string; }) => {
        return res.manufacturer.toLocaleLowerCase().match(this.fridgesList.manufacturer.toLocaleLowerCase());
      })
    }
  }
}
