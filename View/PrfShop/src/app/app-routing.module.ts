import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {UserComponent} from "./user/user.component";
import {ProductComponent} from "./product/product.component";
import {AuthGuard} from "./guards/auth.guard";

const routes: Routes = [
  { path: '', component: UserComponent },
  { path: 'products', component: ProductComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
