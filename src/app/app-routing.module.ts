import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListFridgesComponent } from './endpoints/Fridge/list-fridges/list-fridges.component';
import { ViewFridgeComponent } from './endpoints/Fridge/view-fridge/view-fridge.component';
import { ListModelsComponent } from './endpoints/Model/list-models/list-models.component';
import { ListProductsComponent } from './endpoints/Products/list-products/list-products.component';
import { HomeComponent } from './layout/home/home.component';
import { LoginComponent } from './layout/login/login.component';
import { RegisterComponent } from './layout/register/register.component';
import { AuthGuard } from './shared/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: "/home", pathMatch: "full"},
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'fridges',
    children: [
      { path: '', component: ListFridgesComponent },
      { path: 'list', component: ListFridgesComponent },
      { path: 'view/:id', component:ViewFridgeComponent }
    ], canActivate:[AuthGuard]
  },
  { path: 'models', 
    children: [
      { path: 'list', component: ListModelsComponent }
    ], canActivate:[AuthGuard] 
  },
  { path: 'products', 
    children: [
      { path: 'list', component: ListProductsComponent }
    ], canActivate:[AuthGuard] 
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
