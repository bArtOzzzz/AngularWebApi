import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product';
import { FridgeService } from 'src/app/services/fridge.service';

@Component({
  selector: 'app-list-products',
  templateUrl: './list-products.component.html',
  styleUrls: ['./list-products.component.scss']
})
export class ListProductsComponent implements OnInit {
  productEntity = new Product();
  productsList: any=[];
  startPage: number = 1;

  fridgeProductMap: Map<any, any> = new Map();

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

  getProducts() {
    this.fridgeService.getProducts().subscribe(data => {
      this.productsList = data;
    })
  }

  deleteProduct(productId: string) {

  }
}
