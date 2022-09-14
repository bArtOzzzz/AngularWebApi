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
import { ListModelsComponent } from './Model/list-models/list-models.component';
import { AddModelComponent } from './Model/add-model/add-model.component';
import { EditModelComponent } from './Model/edit-model/edit-model.component';
import { ListProductsComponent } from './Products/list-products/list-products.component';
import { AddNewProductComponent } from './Products/add-new-product/add-new-product.component';
import { EditNewProductComponent } from './Products/edit-new-product/edit-new-product.component';
import { ListUsersComponent } from './Users/list-users/list-users.component';
import { ListRolesComponent } from './Role/list-roles/list-roles.component';
import { AddRoleComponent } from './Role/add-role/add-role.component';
import { EditRoleComponent } from './Role/edit-role/edit-role.component';
import { ChangeRoleComponent } from './Users/change-role/change-role.component';



@NgModule({
  declarations: [
    AddFridgeComponent,
    ListFridgesComponent,
    EditFridgeComponent,
    ViewFridgeComponent,
    AddProductComponent,
    EditProductComponent,
    ListModelsComponent,
    AddModelComponent,
    EditModelComponent,
    ListProductsComponent,
    AddNewProductComponent,
    EditNewProductComponent,
    ListUsersComponent,
    ListRolesComponent,
    AddRoleComponent,
    EditRoleComponent,
    ChangeRoleComponent
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
