import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { FridgeProduct } from 'src/app/models/fridgeProduct';
import { Product } from 'src/app/models/product';
import { FridgeService } from 'src/app/services/fridge.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit {
  fridgeProductEntity = new FridgeProduct();
  currentProductId!: string;
  productsList$! : Observable<any[]>;
  productsList: any=[];

  fridgeProductsMap: Map<string, string> = new Map();

  @Input() currentFridgeId!: string;

  constructor(private fridgeService: FridgeService) { }

  ngOnInit(): void {
    this.getProducts();
    this.productsList$ = this.fridgeService.getProducts();
  }

  onSubmit() {
    this.createProduct();
  }

  createProduct() {
    for(let i = 0; i < this.productsList.length; i++) {
      if(this.productsList[i].name == this.fridgeProductEntity.productId) {
        this.fridgeProductEntity.productId = this.productsList[i].id;
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
  }

  getProducts() {
    this.fridgeService.getProducts().subscribe(data => {
      this.productsList = data;
    })
  }
}
