import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FridgeService } from 'src/app/services/fridge.service';

@Component({
  selector: 'app-view-fridge',
  templateUrl: './view-fridge.component.html',
  styleUrls: ['./view-fridge.component.scss']
})
export class ViewFridgeComponent implements OnInit {
  fridgeId!: string;
  productsList: any=[];
  fridgeProductsList: any=[];
  pages: number = 1;
  productId!: string;
  fridgeProduct!: any;

  constructor(private fridgeService:FridgeService, private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.getFridgeId();
    this.getFridgeProducts();
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

  getFridgeId() {
    this.route.params.subscribe(params => {
      this.fridgeId = params['id']
    });
   }

  getProductId(productId: string) {
    this.productId = productId;
    for(let i = 0; i < this.fridgeProductsList.length; i++) {
      if(this.fridgeProductsList[i].productId == this.productId)
        this.fridgeProduct = this.fridgeProductsList[i];
    }
    console.log(this.fridgeProduct)
  }

  getProducts() {
    this.fridgeService.getProductsByFridgeId(this.fridgeId).subscribe(data => {
      this.productsList = data;
    })
  }

  getFridgeProducts() {
    this.fridgeService.getFridgeProducts().subscribe(data => {
      this.fridgeProductsList = data;
    })
  }

  deleteFridgeProduct(productId: string) {
    if(confirm(`Are you sure you want to delete this product?`)) {
      for(let i = 0; i < this.fridgeProductsList.length; i++) {
        if(this.fridgeProductsList[i].productId == productId)
          this.fridgeProduct = this.fridgeProductsList[i];
      }
      this.fridgeService.deleteFridgeProduct(this.fridgeProduct.id).subscribe(res => {
        setTimeout(function() {
          window.location.reload();
        }, 700)
      })
    }
  }
}
