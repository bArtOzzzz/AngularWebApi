import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { NgxPaginationModule } from 'ngx-pagination';

import { LayoutModule } from '../layout/layout.module';
import { ViewFridgeComponent } from './Fridge/view-fridge/view-fridge.component';
import { RouterModule } from '@angular/router';
import { AddFridgeComponent } from './Fridge/add-fridge/add-fridge.component';
import { ListFridgesComponent } from './Fridge/list-fridges/list-fridges.component';
import { EditFridgeComponent } from './Fridge/edit-fridge/edit-fridge.component';
import { AddProductComponent } from './Products/add-product/add-product.component';
import { EditProductComponent } from './Products/edit-product/edit-product.component';



@NgModule({
  declarations: [
    AddFridgeComponent,
    ListFridgesComponent,
    EditFridgeComponent,
    ViewFridgeComponent,
    AddProductComponent,
    EditProductComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    NgxPaginationModule,
    Ng2SearchPipeModule,
    ReactiveFormsModule,
    FormsModule,
    LayoutModule
  ]
})
export class EndpointsModule { }
