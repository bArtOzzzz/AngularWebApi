import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { FridgeProduct } from 'src/app/models/FridgeProducts';
import { FridgeService } from 'src/app/services/fridge.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit {
  productsList$! : Observable<any[]>;
  fridgeProductEntity = new FridgeProduct();

  @Input() currentFridgeId!: string;

  constructor(private fridgeService: FridgeService) { }

  ngOnInit(): void {
    this.productsList$ = this.fridgeService.getProducts();
  }

  onSubmit() {
    this.createProduct();
  }

  createProduct() {
    this.productsList$.subscribe(data => {
      for(var i = 0; i < data.length; i++) {
        if(data[i].name == this.fridgeProductEntity.productId) {
          this.fridgeProductEntity.productId = data[i].id;
          console.log(this.fridgeProductEntity);
        }
      }
      this.fridgeService.createFridgeProduct(this.currentFridgeId, this.fridgeProductEntity).subscribe(data => {
      var closeModalBtn = document.getElementById('create-product-modal-close');
        if(closeModalBtn) {
          closeModalBtn.click();
        }
        setTimeout(function() {
          window.location.reload();
        }, 500)
    })
    })
  }
}
