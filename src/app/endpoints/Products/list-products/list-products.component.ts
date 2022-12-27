import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product';
import { FridgeService } from 'src/app/services/fridge.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list-products',
  templateUrl: './list-products.component.html',
  styleUrls: ['./list-products.component.scss']
})
export class ListProductsComponent implements OnInit {
  productEntity = new Product();
  productsList: any=[];
  startPage: number = 1;
  activateModalComponent: boolean = false;
  product = new Product();

  constructor(private fridgeService:FridgeService) { }

  ngOnInit(): void {
    this.getProducts();
  }

  Search() {
    if(this.productsList.name == '') {
      this.ngOnInit();
    }
    else {
      this.productsList = this.productsList.filter((res: { name: string; }) => {
        return res.name.toLocaleLowerCase().match(this.productsList.name.toLocaleLowerCase());
      })
    }
  }

    // Response to "modalCreateOpen" event
    modalEditOpen(product:Product) {
      this.product = product;
      this.activateModalComponent = true;
    }
  
    // Response to "modalCreateClose" event
    modalClose() {
      this.activateModalComponent = false;
    }

  getProducts() {
    this.fridgeService.getProducts().subscribe(data => {
      this.productsList = data;
    })
  }

  deleteProduct(productId: string) {
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
        this.fridgeService.deleteProduct(productId).subscribe(res => {
          setTimeout(function() {
            window.location.reload();
          }, 1800)
        })
      }
    })
  }
}
