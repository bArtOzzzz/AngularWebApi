import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { FridgeProduct } from 'src/app/models/fridgeProduct';
import { FridgeService } from 'src/app/services/fridge.service';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.scss']
})
export class EditProductComponent implements OnInit {
  fridgeProductEntity = new FridgeProduct();
  @Input() currentFridgeId!: string;

  fridgeProductsList!: Observable<any[]>;

  constructor(private fridgeService: FridgeService) { }

  ngOnInit(): void {
    this.getFridgeProducts();
  }

  onSubmit() {
    this.editProduct();
  }

  getFridgeProducts() {
    this.fridgeService.getFridgeProducts().subscribe(data => {
      this.fridgeProductsList = data;
    })
  }

  editProduct() {
    var fridgeProduct = {
      productCount: this.fridgeProductEntity.productCount,
      fridgeId: this.currentFridgeId,
      productId: this.fridgeProductEntity.productId
    }

    console.log(fridgeProduct);
    console.log(this.fridgeProductEntity.id);

    // this.fridgeService.updateFridgeProduct(this.fridgeProductEntity.id, fridgeProduct).subscribe(data => {
    //   var closeModalBtn = document.getElementById('edit-product-modal-close');
    //     if(closeModalBtn) {
    //       closeModalBtn.click();
    //     }
    //     setTimeout(function() {
    //       window.location.reload();
    //     }, 500)
    // })
  }
}
