import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListFridgesComponent } from './endpoints/Fridge/list-fridges/list-fridges.component';
import { ViewFridgeComponent } from './endpoints/Fridge/view-fridge/view-fridge.component';
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
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
