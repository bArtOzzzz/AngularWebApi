import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FridgeService } from 'src/app/services/fridge.service';

@Component({
  selector: 'app-view-fridge',
  templateUrl: './view-fridge.component.html',
  styleUrls: ['./view-fridge.component.scss']
})
export class ViewFridgeComponent implements OnInit {
  productsList: any=[];
  fridgeProductsList: any=[];
  pages: number = 1;
  currentFridgeId!: string;
  currentFridgeProducts: any=[];
  productId!: string;
  fridgeProductId!: string;

  fridgeProductMap: Map<any, any> = new Map();

  constructor(private fridgeService:FridgeService, private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.getFridgeId();
    this.getProducts();
    this.getFridgeProducts();
    this.getFrigdeProductByProductId();
  }

   getFridgeId() {
    this.route.params.subscribe(params => {
      this.currentFridgeId = params['id']
    });
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

  getProductId(productId: string) {
    this.productId = productId;
    for(let i = 0; i < this.fridgeProductsList.length; i++) {
      if(productId ==  this.fridgeProductsList[i].productId)
        this.fridgeProductId = this.fridgeProductsList[i].id;
    }
  }

  getFridgeProducts() {
    this.fridgeService.getFridgeProducts().subscribe(data => {
      this.fridgeProductsList = data;
    })
  }

  getProducts() {
    this.fridgeService.getProductsByFridgeId(this.currentFridgeId).subscribe(data => {
      this.productsList = data;
    })
  }

  deleteFridgeProduct(product: any) {
    if(confirm(`Are you sure you want to delete this product?`)) {
      var currentFridgeProductId;
      for(var i = 0; i < this.fridgeProductsList.length; i++) {
        if(this.fridgeProductsList[i].productId == product.id) {
          currentFridgeProductId = this.fridgeProductsList[i];
        }
      }
      this.fridgeService.deleteFridgeProduct(currentFridgeProductId.id).subscribe(res => {
        setTimeout(function() {
          window.location.reload();
        }, 500)
      })
    }
  }

  getFrigdeProductByProductId() {
    this.fridgeService.getFridgeProductByProductId(this.currentFridgeId).subscribe(data => {
      this.currentFridgeProducts = data;
    })
  }
}
