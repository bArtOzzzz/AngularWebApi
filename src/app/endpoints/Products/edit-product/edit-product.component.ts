import { Component, Input, OnInit } from '@angular/core';
import { FridgeProduct } from 'src/app/models/New-FridgeProduct';
import { FridgeService } from 'src/app/services/fridge.service';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.scss']
})
export class EditProductComponent implements OnInit {
  fridgeProductEntity = new FridgeProduct();
  @Input() currentFridgeId!: string;
  @Input() productId!: string;
  @Input() fridgeProductId!: string;
  currentFridgeProducts: any=[];

  constructor(private fridgeService: FridgeService) { }

  ngOnInit(): void {
  }

  onSubmit() {
    this.editProduct();
  }

  editProduct() {
    this.fridgeProductEntity.productId = this.productId;
    this.fridgeProductEntity.FridgeId = this.currentFridgeId;
    
    for(let i = 0; i < this.currentFridgeProducts.length; i++) {
      console.log(this.currentFridgeProducts[i]);
    }

    this.fridgeService.updateFridgeProduct(this.fridgeProductId, this.fridgeProductEntity).subscribe(data => {
      var closeModalBtn = document.getElementById('edit-product-modal-close');
        if(closeModalBtn) {
          closeModalBtn.click();
        }
        setTimeout(function() {
          window.location.reload();
        }, 500)
    })
  }
}
