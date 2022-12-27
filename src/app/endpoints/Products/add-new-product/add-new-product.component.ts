import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product';
import { FridgeService } from 'src/app/services/fridge.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-new-product',
  templateUrl: './add-new-product.component.html',
  styleUrls: ['./add-new-product.component.scss']
})
export class AddNewProductComponent implements OnInit {
  productEntity = new Product();

  constructor(private fridgeService: FridgeService) { }

  ngOnInit(): void {
  }

  onSubmit() {
    this.createNewProduct();
  }

  createNewProduct() {
    this.fridgeService.createProduct(this.productEntity).subscribe(data => {
      var closeModalBtn = document.getElementById('add-new-product-modal-close');
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
  }
}
