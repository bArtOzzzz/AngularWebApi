import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListAllFridgesComponent } from './endpoints/Fridge/list-all-fridges/list-all-fridges.component';
import { ListFridgesComponent } from './endpoints/Fridge/list-fridges/list-fridges.component';
import { ViewFridgeComponent } from './endpoints/Fridge/view-fridge/view-fridge.component';
import { ListModelsComponent } from './endpoints/Model/list-models/list-models.component';
import { ListProductsComponent } from './endpoints/Products/list-products/list-products.component';
import { ListRolesComponent } from './endpoints/Role/list-roles/list-roles.component';
import { ListUsersComponent } from './endpoints/Users/list-users/list-users.component';
import { HomeComponent } from './layout/home/home.component';
import { LoginComponent } from './layout/login/login.component';
import { ProfileComponent } from './layout/profile/profile.component';
import { RegisterComponent } from './layout/register/register.component';
import { AuthGuard } from './shared/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: "/home", pathMatch: "full"},
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'fridges',
    children: [
      { path: '', component: ListFridgesComponent },
      { path: 'list', component: ListFridgesComponent },
      { path: 'view/:id', component:ViewFridgeComponent }
    ], canActivate:[AuthGuard],
    data: {
      roles: ['Administrator', 'User']
    }
  },
  { path: 'allFridges',
    children: [
      { path: 'list', component: ListAllFridgesComponent },
    ], canActivate:[AuthGuard],
    data: {
      roles: ['Administrator']
    }
  },
  { path: 'models', 
    children: [
      { path: 'list', component: ListModelsComponent }
    ], canActivate:[AuthGuard],
    data: {
      roles: ['Administrator']
    }
  },
  { path: 'products', 
    children: [
      { path: 'list', component: ListProductsComponent }
    ], canActivate:[AuthGuard],
    data: {
      roles: ['Administrator']
    }
  },
  { path: 'users',
    children: [
      { path: 'list', component: ListUsersComponent }
    ], canActivate:[AuthGuard],
    data: {
      roles: ['Administrator']
    }
  },
  { path: 'roles',
    children: [
      { path: 'list', component: ListRolesComponent }
    ], canActivate:[AuthGuard],
    data: {
      roles: ['Administrator']
    }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
