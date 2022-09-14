import { Component, OnInit } from '@angular/core';
import { FridgeService } from 'src/app/services/fridge.service';

@Component({
  selector: 'app-list-fridges',
  templateUrl: './list-fridges.component.html',
  styleUrls: ['./list-fridges.component.scss']
})
export class ListFridgesComponent implements OnInit {
  fridgesList: any=[];
  activateModalComponent: boolean = false;
  startPage: number = 1;
  fridge: any;

  constructor(private fridgeService:FridgeService) { }

  ngOnInit(): void {
    this.fridgeService.getUserData();
    this.getFridges();
  }

  // Implements endpoint of getting fridges
  getFridges() {
    this.fridgeService.getFridges(this.fridgeService.userData['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier']).subscribe(data => {
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

  // Response to "modalCreateOpen" event
  modalEditOpen(fridge:any) {
    this.fridge = fridge;
    this.activateModalComponent = true;
  }

  // Response to "modalCreateClose" event
  modalClose() {
    this.activateModalComponent = false;
  }

  deleteFridge(fridgeId: string) {
    if(confirm(`Are you sure you want to delete this fridge?`)) {
      this.fridgeService.deleteFridge(fridgeId).subscribe(res => {
        setTimeout(function() {
          window.location.reload();
        }, 500)
      })
    }
  }
}
