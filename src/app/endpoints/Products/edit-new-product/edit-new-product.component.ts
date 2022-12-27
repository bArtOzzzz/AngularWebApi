import { Component, Input, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product';
import { FridgeService } from 'src/app/services/fridge.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-new-product',
  templateUrl: './edit-new-product.component.html',
  styleUrls: ['./edit-new-product.component.scss']
})
export class EditNewProductComponent implements OnInit {
  productEntity = new Product();
  productId!: string;
  @Input() product:any;

  constructor(private fridgeService:FridgeService) { }

  ngOnInit(): void {
  }

  onSubmit() {
    this.updateProduct();
  }

  updateProduct() {
    this.fridgeService.updateProduct(this.product.id, this.productEntity).subscribe(data => {
      var closeModalBtn = document.getElementById('edit-new-product-modal-close');
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
