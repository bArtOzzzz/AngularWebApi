import { Component, OnInit } from '@angular/core';
import { FridgeService } from 'src/app/services/fridge.service';
import Swal from 'sweetalert2';

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
        this.fridgeService.deleteFridge(fridgeId).subscribe(res => {
          setTimeout(function() {
            window.location.reload();
          }, 500)
        })
      }
    })
  }
}
