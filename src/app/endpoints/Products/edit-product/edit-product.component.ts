import { Component, Input, OnInit } from '@angular/core';
import { FridgeProduct } from 'src/app/models/New-FridgeProduct';
import { FridgeService } from 'src/app/services/fridge.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.scss']
})
export class EditProductComponent implements OnInit {
  fridgeProductEntity = new FridgeProduct();
  @Input() fridgeProduct!: any;
  @Input() productId!: string;

  constructor(private fridgeService: FridgeService) { }

  ngOnInit(): void {}

  onSubmit() {
    this.fridgeProductEntity.fridgeId = this.fridgeProduct.fridgeId;
    this.fridgeProductEntity.productId = this.fridgeProduct.productId;
    this.editProduct();
  }

  editProduct() {
    this.fridgeService.updateFridgeProduct(this.fridgeProduct.id, this.fridgeProductEntity).subscribe(data => {
      var closeModalBtn = document.getElementById('edit-product-modal-close');
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
